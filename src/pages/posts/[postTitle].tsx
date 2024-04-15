import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { getMarkdownFiles, TranspileMarkdownFile } from '@/lib/staticHelper';
import { MarkdownFile } from 'mdman';
import type { GetStaticPathsResult } from 'next';
import MarkdownViewPage from '@/components/MarkdownViewPage';

export const getStaticPaths = (async () => {
  const mdFiles = getMarkdownFiles();
  const result: GetStaticPathsResult = { paths: [], fallback: false };

  mdFiles.map((file) => {
    result.paths.push({
      params: { postTitle: file.metadata?.title },
    });
  });

  return result;
}) satisfies GetStaticPaths;

export const getStaticProps = (async (ctx) => {
  const mdFiles = getMarkdownFiles();
  const title = ctx.params?.['postTitle'];
  const foundFile = mdFiles.find((file) => file.metadata?.title == title);
  foundFile && TranspileMarkdownFile(foundFile);

  return { props: { md: foundFile } };
}) satisfies GetStaticProps<{
  md: MarkdownFile | undefined;
}>;

export default function PostViewPage({
  md,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <MarkdownViewPage md={md} />;
}
