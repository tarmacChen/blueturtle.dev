import { PostCard } from '@/components/PostCard';
import { PostPagination } from '@/components/PostPagination';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BasicPage } from '@/components/BasicPage';
import { getStaticProps as pageIndexStaticProps } from '@/pages/page/[pageIndex]';
import { SnippetCard } from '@/components/SnippetCard';

export const getStaticProps = (async (ctx) => {
  return pageIndexStaticProps(ctx);
}) satisfies GetStaticProps;

export default function PostCardsPage({
  mdFiles,
  pageIndex = 1,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const posts = mdFiles[pageIndex - 1];

  return (
    <BasicPage>
      <div className="flex flex-col mb-24 gap-4 items-center">
        {posts.map((file) => {
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
        })}
        <PostPagination
          groups={mdFiles}
          baseUrl="/page"
          currentIndex={pageIndex}
        />
      </div>
    </BasicPage>
  );
}
