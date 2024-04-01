import { PostCard } from '@/components/PostCard';
import { getMarkdownFiles, paginateElements } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import { useEffect, useState } from 'react';
import { MainWrapper } from '../components/MainWrapper';
import { useScroll } from '@/hooks/useScroll';
import { FooterSection } from '@/components/FooterSection';
import { useMobile } from '@/hooks/useMobile';
import { PostPagination } from '@/components/PostPagination';
import type { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles();
  const posts = mdFiles;
  const postGroups = paginateElements<MarkdownFile>(posts, 10);
  const pageIndex = 0;

  return { props: { mdFiles: postGroups } };
}) satisfies GetStaticProps;

export default function HomePage({ mdFiles }: { mdFiles: MarkdownFile[][] }) {
  const [scrollY, setScrollY] = useState(0);
  const { isScrollingUp, updatePosition } = useScroll();
  const { isMobile } = useMobile();
  const posts = mdFiles[0];

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

  return (
    <>
      <MainWrapper>
        <div className="flex flex-col mb-24 gap-4 items-center">
          {posts.map((file) => {
            return (
              <div
                key={file.filename}
                className="w-full lg:w-1/2">
                <PostCard mdFile={file}></PostCard>
              </div>
            );
          })}
          <PostPagination
            groups={mdFiles}
            baseUrl="/page"
            currentIndex={1}
          />
        </div>
      </MainWrapper>

      {isMobile && isScrollingUp && <FooterSection />}
    </>
  );
}
