import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { getMarkdownFiles } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import type { GetStaticPathsResult } from 'next';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { a11yDark as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MainWrapper } from '../../components/MainWrapper';
import { useEffect, useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import MarkdownNavbar from 'markdown-navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { FooterSection } from '@/components/FooterSection';
import { useMobile } from '@/hooks/useMobile';

export const getStaticPaths = (async () => {
  const mdFiles = getMarkdownFiles();
  const result: GetStaticPathsResult = { paths: [], fallback: false };

  mdFiles.map((file) => {
    result.paths.push({
      params: { postTitle: file.metadata?.title },
    });
  });

  return result;
}) satisfies GetStaticPaths;

export const getStaticProps = (async (ctx) => {
  const mdFiles = getMarkdownFiles();
  const title = ctx.params?.['postTitle'];
  const foundFile = mdFiles.find((file) => file.metadata?.title == title);

  return { props: { md: foundFile } };
}) satisfies GetStaticProps<{
  md: MarkdownFile | undefined;
}>;

export default function Page({
  md,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [scrollY, setScrollY] = useState(0);
  const { isScrollingUp, updatePosition } = useScroll();
  const { isMobile } = useMobile();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    updatePosition(scrollY);
  }, [scrollY]);

  const showBackToTopButton = isScrollingUp && scrollY > window.outerHeight;

  return (
    <>
      <MainWrapper>
        <div className="flex flex-col lg:flex-row">
          <MarkdownNavbar
            source={md?.content || ''}
            ordered={true}
            headingTopOffset={70}
            className="lg:fixed max-md:w-full max-lg:w-prose lg:w-80 mx-auto overflow-auto bg-gray-100"
          />
          <div className="lg:ml-96 w-full flex justify-center">
            <MarkdownViewer
              markdown={{ content: md?.content }}
              codeStyle={codeStyle}
            />
          </div>
        </div>
      </MainWrapper>

      {showBackToTopButton && (
        <ScrollToTop className="fixed bottom-16 right-4 gap-1">
          <ArrowUpIcon />
          Back to top
        </ScrollToTop>
      )}
      {isMobile && <div className="h-16"></div>}
      {isMobile && isScrollingUp && <FooterSection />}
    </>
  );
}
