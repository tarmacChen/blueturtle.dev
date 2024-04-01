import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { getMarkdownFiles, paginateElements } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';

export const getStaticPaths = (async () => {
  const mdFiles = getMarkdownFiles();
  const routes: GetStaticPathsResult = { paths: [], fallback: false };
  const posts = mdFiles;
  const postGroups = paginateElements<MarkdownFile>(posts, 5);

  postGroups.map((group, index) => {
    routes.paths.push({
      params: { pageIndex: (index + 1).toString() },
    });
  });

  return routes;
}) satisfies GetStaticPaths;

export const getStaticProps = (async (ctx) => {
  const index = ctx.params?.['pageIndex'];

  return { props: { pageIndex: index } };
}) satisfies GetStaticProps;

export default function Page({
  pageIndex,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return pageIndex;
}
