import { getMarkdownFiles, sortByCreatedTime } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import Layout from './layout';
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
        <Layout>
          <div className="w-full items-start">
            <h1 className="text-2xl underline">All Posts</h1>
          </div>
          {mdFiles.map((file) => {
            const createdTime = moment(file.metadata.createdTime).format('ll');
            const url = `/posts/${file.metadata?.title}`;

            return (
              <div
                className="flex flex-row md:w-2/3 max-md:w-full justify-between"
                key={file.filename}>
                <Link
                  href={url}
                  className="flex flex-row w-full border-b-2 p-2 hover:text-blue-600 hover:underline justify-between">
                  <div>{file.metadata.title}</div>
                  <div>{createdTime}</div>
                </Link>
              </div>
            );
          })}
        </Layout>
      </MainWrapper>
    );
  }
}
