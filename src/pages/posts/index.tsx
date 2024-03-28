import { getMarkdownFiles, sortByCreatedTime } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import moment from 'moment';
import { MainWrapper } from '../../components/MainWrapper';
import { useEffect, useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import Link from 'next/link';

export async function getStaticProps() {
  const files = getMarkdownFiles().sort(sortByCreatedTime).reverse();
  const mdFiles = files.filter((file) => file.metadata.category == 'posts');
  return { props: { mdFiles: mdFiles } };
}

export default function PostsPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  {
    const [scrollY, setScrollY] = useState(0);
    const { isScrollingUp, updatePosition } = useScroll();

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
      <MainWrapper showMobileNavbar={isScrollingUp}>
        <h1 className="text-2xl border-b-2 pl-2 mb-2 border-b-gray-300">
          All Posts
        </h1>
        <div className="flex flex-col gap-1 mx-auto ">
          {mdFiles.map((file) => {
            const createdTime = moment(file.metadata.createdTime).format('ll');
            const url = `/posts/${file.metadata?.title}`;
            const tags = file.metadata?.tags
              ? file.metadata?.tags.join(', ')
              : '';

            return (
              <div
                className="flex flex-row w-full hover:bg-blue-50"
                key={file.filename}>
                <Link
                  href={url}
                  className="flex flex-row w-full border-b-2 p-2 border-dotted hover:border-b-blue-600 justify-between">
                  <div className="flex flex-col">
                    <div>{file.metadata.title}</div>
                    <div className="text-sm font-light text-gray-600">
                      {file.metadata.description}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm ">{createdTime}</div>
                    <div className="text-sm font-light text-gray-600">
                      {tags}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </MainWrapper>
    );
  }
}
