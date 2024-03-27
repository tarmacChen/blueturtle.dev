import { PostCard } from '@/components/PostCard';
import { getMarkdownFiles, sortByCreatedTime } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import { useEffect, useRef, useState } from 'react';
import { MainWrapper } from '../components/MainWrapper';

export async function getStaticProps() {
  const files = getMarkdownFiles().sort(sortByCreatedTime).reverse();
  const mdFiles = files.filter((file) => file.metadata.category == 'posts');
  return { props: { mdFiles: mdFiles } };
}

export default function HomePage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  const scrollPosition = useRef(0);
  const [visible, setVisible] = useState(true);

  const updatePosition = () => {
    scrollPosition.current = window.scrollY;
    setVisible(scrollPosition.current > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return (
    <MainWrapper visible={visible}>
      {mdFiles.map((file) => {
        return (
          <div
            key={file.filename}
            className="w-full">
            <PostCard mdFile={file}></PostCard>
          </div>
        );
      })}
    </MainWrapper>
  );
}
