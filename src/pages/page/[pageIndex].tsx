import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { getMarkdownFiles, paginateElements } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import PostCardsPage from '@/pages/index';

export const getStaticPaths = (async () => {
  const mdFiles = getMarkdownFiles();
  const routes: GetStaticPathsResult = { paths: [], fallback: false };
  const posts = mdFiles;
  const postGroups = paginateElements<MarkdownFile>(posts, 5);

  postGroups.map((group, index) => {
    const pageIndex = (index + 1).toString();

    routes.paths.push({
      params: { pageIndex: pageIndex },
    });
  });

  return routes;
}) satisfies GetStaticPaths;

export const getStaticProps = (async (ctx) => {
  const env = process.env.NODE_ENV;
  const mdFiles = getMarkdownFiles();
  const prodPosts = mdFiles.filter(
    (md) => md.metadata.category != 'ignore' && md.metadata.draft == false,
  );
  const devPosts = mdFiles.filter((md) => md.metadata.category != 'ignore');
  const posts = env == 'development' ? devPosts : prodPosts;
  const postGroups = paginateElements<MarkdownFile>(posts, 5);
  const index = Array.isArray(ctx.params?.['pageIndex'])
    ? ctx.params?.['pageIndex'][0]
    : ctx.params?.['pageIndex'] || '1';
  const pageIndex = parseInt(index);

  return { props: { pageIndex: pageIndex, mdFiles: postGroups } };
}) satisfies GetStaticProps;

export default function Page({
  pageIndex,
  mdFiles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PostCardsPage
      pageIndex={pageIndex}
      mdFiles={mdFiles}
    />
  );
}
