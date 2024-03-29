import { getMarkdownFiles, sortByCreatedTime } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import { MainWrapper } from '../../components/MainWrapper';
import React, { useEffect, useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { withListItemDecorator } from '@/lib/helper';
import { PostItem } from '@/components/PostItem';
import { FooterSection } from '@/components/FooterSection';
import { useMobile } from '@/hooks/useMobile';

export async function getStaticProps() {
  const files = getMarkdownFiles().sort(sortByCreatedTime).reverse();
  const mdFiles = files.filter((file) => file.metadata.category == 'posts');
  return { props: { mdFiles: mdFiles } };
}

export default function PostsPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  {
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

    const oddItemClasses = 'bg-white';
    const evenItemClasses = 'bg-gray-50';

    const NavItems = mdFiles.map((file) => {
      const url = `/posts/${file.metadata?.title}`;
      return (
        <PostItem
          key={file.filename}
          href={url}
          file={file}
        />
      );
    });

    return (
      <>
        <MainWrapper>
          <h1 className="text-2xl border-b-2 pl-2 mb-2 border-b-gray-300">
            All Posts
          </h1>
          <div className="flex flex-col gap-1 mx-auto ">
            {withListItemDecorator(NavItems, {
              oddItemClasses: oddItemClasses,
              evenItemClasses: evenItemClasses,
            })}
          </div>
        </MainWrapper>
        {isMobile && isScrollingUp && <FooterSection />}
      </>
    );
  }
}
