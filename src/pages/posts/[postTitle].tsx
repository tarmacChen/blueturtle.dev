import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { getMarkdownFiles } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import type { GetStaticPathsResult } from 'next';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import Layout from './layout';
import { a11yDark as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MainWrapper } from '../../components/MainWrapper';

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

  return { props: { md: foundFile } };
}) satisfies GetStaticProps<{
  md: MarkdownFile | undefined;
}>;

export default function Page({
  md,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainWrapper>
      <Layout>
        <MarkdownViewer
          markdown={{ content: md?.content }}
          codeStyle={codeStyle}></MarkdownViewer>
      </Layout>
    </MainWrapper>
  );
}
