import { getMarkdownFiles, TranspileMarkdownFile } from '@/lib/mdHelper';
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { MarkdownFile } from 'mdman';
import { getStaticProps as getMarkdownProps } from '@/pages/posts/[postTitle]';
import MarkdownViewPage from '@/components/MarkdownViewPage';

export const getStaticPaths = (async () => {
  const mdFiles = getMarkdownFiles();
  const result: GetStaticPathsResult = { paths: [], fallback: false };

  mdFiles.map((file) => {
    result.paths.push({
      params: { snippetTitle: file.metadata?.title },
    });
  });

  return result;
}) satisfies GetStaticPaths;

export const getStaticProps = (async (ctx) => {
  const mdFiles = getMarkdownFiles();
  const title = ctx.params?.['snippetTitle'];
  const foundFile = mdFiles.find((file) => file.metadata?.title == title);
  foundFile && TranspileMarkdownFile(foundFile);

  return { props: { md: foundFile } };
}) satisfies GetStaticProps<{
  md: MarkdownFile | undefined;
}>;

export default function SnippetViewPage({
  md,
}: InferGetStaticPropsType<typeof getMarkdownProps>) {
  return <MarkdownViewPage md={md} />;
}
