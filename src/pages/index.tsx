import { PostCard } from '@/components/PostCard';
import { getMarkdownFiles, sortByCreatedTime } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import { useEffect, useState } from 'react';
import { MainWrapper } from '../components/MainWrapper';
import { useScroll } from '@/hooks/useScroll';
import { FooterSection } from '@/components/FooterSection';
import { useMobile } from '@/hooks/useMobile';

export async function getStaticProps() {
  const files = getMarkdownFiles().sort(sortByCreatedTime).reverse();
  const mdFiles = files.filter((file) => file.metadata.category == 'posts');

  return { props: { mdFiles: mdFiles } };
}

export default function HomePage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
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

  return (
    <>
      <MainWrapper>
        <div className="flex flex-col mb-24 gap-4 overflow-scroll items-center">
          {mdFiles.map((file) => {
            return (
              <div
                key={file.filename}
                className="w-full lg:w-1/2">
                <PostCard mdFile={file}></PostCard>
              </div>
            );
          })}
        </div>
      </MainWrapper>

      {isMobile && isScrollingUp && <FooterSection />}
    </>
  );
}
