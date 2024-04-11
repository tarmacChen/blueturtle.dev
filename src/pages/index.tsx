import { PostCard } from '@/components/PostCard';
import { MarkdownFile } from 'mdman';
import { PostPagination } from '@/components/PostPagination';
import type { GetStaticProps } from 'next';
import { BasicPage } from '@/components/BasicPage';
import { getStaticProps as pageIndexStaticProps } from '@/pages/page/[pageIndex]';

export const getStaticProps = (async (ctx) => {
  return pageIndexStaticProps(ctx);
}) satisfies GetStaticProps;

export default function PostCardsPage({
  mdFiles,
  pageIndex = 1,
}: {
  mdFiles: MarkdownFile[][];
  pageIndex?: number;
}) {
  const posts = mdFiles[pageIndex - 1];

  return (
    <BasicPage>
      <div className="flex flex-col mb-24 gap-4 items-center">
        {posts.map((file) => {
          return (
            <div
              key={file.filename}
              className="max-md:w-full w-2/3 xl:w-1/2 ">
              <PostCard mdFile={file}></PostCard>
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
