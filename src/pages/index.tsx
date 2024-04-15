import { PostCard } from '@/components/PostCard';
import { PostPagination } from '@/components/PostPagination';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BasicPage } from '@/components/BasicPage';
import { getStaticProps as pageIndexStaticProps } from '@/pages/page/[pageIndex]';
import { SnippetCard } from '@/components/SnippetCard';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { paginateElements } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const getStaticProps = (async (ctx) => {
  return pageIndexStaticProps(ctx);
}) satisfies GetStaticProps;

const PostCards = ({ posts }: { posts: MarkdownFile[] }) => {
  return posts?.map((file) => {
    return (
      <div
        key={file.filename}
        className="max-md:w-full w-2/3 xl:w-1/2 ">
        {file.metadata.category == 'posts' ? (
          <PostCard mdFile={file} />
        ) : (
          <SnippetCard mdFile={file} />
        )}
      </div>
    );
  });
};

export default function PostCardsPage({
  posts,
  pageIndex = 1,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchPattern, setSearchPattern] = useState('');
  const foundPosts = posts.filter((md) => {
    const title = md.metadata.title || '';
    const pattern = new RegExp(searchPattern, 'ig');
    return title.match(pattern);
  });
  const paginations = paginateElements<MarkdownFile>(foundPosts, 5);
  const iconSize = '20';

  return (
    <BasicPage>
      <div className="flex flex-col mb-24 gap-4 items-center">
        <div className="flex w-full justify-end max-md:w-full w-2/3 xl:w-1/2">
          <div className="flex flex-row gap-2 justify-center items-center">
            <MagnifyingGlassIcon
              width={iconSize}
              height={iconSize}
            />
            <Input
              type="text"
              placeholder="Search..."
              value={searchPattern}
              onChange={(event) => setSearchPattern(event.target.value)}
              className="border-gray-500 focus-visible:border-none text-md"
            />
          </div>
        </div>

        {searchPattern == '' ? (
          <PostCards posts={paginations[pageIndex - 1]} />
        ) : (
          <PostCards posts={foundPosts} />
        )}

        {searchPattern == '' && (
          <PostPagination
            posts={foundPosts}
            baseUrl="/page"
            currentIndex={pageIndex}
          />
        )}
      </div>
    </BasicPage>
  );
}
