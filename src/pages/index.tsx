import { PostCard } from '@/components/PostCard';
import { getMarkdownFiles, paginateElements } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import { PostPagination } from '@/components/PostPagination';
import type { GetStaticProps } from 'next';
import { BasicPage } from '@/components/BasicPage';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles();
  const posts = mdFiles;
  const postGroups = paginateElements<MarkdownFile>(posts, 5);

  return { props: { mdFiles: postGroups } };
}) satisfies GetStaticProps;

export default function HomePage({
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
              className="w-full lg:w-1/2">
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
