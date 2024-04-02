import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { getMarkdownFiles } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import type { GetStaticPathsResult } from 'next';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { a11yDark as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import MarkdownNavbar from 'markdown-navbar';
import { BasicPage } from '@/components/BasicPage';

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

export default function PostViewPage({
  md,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BasicPage>
      <div className="flex flex-col lg:flex-row gap-8">
        <MarkdownNavbar
          source={md?.content || ''}
          ordered={true}
          headingTopOffset={84}
          className="lg:fixed xl:left-16 2xl:left-32 max-md:w-full max-lg:w-prose lg:w-80 xl:w-96 2xl:w-128 mx-auto overflow-auto bg-gray-100"
        />
        <div className="flex lg:ml-96 xl:ml-128 2xl:ml-144 lg:w-[calc(60%)] justify-center mb-32">
          <MarkdownViewer
            markdown={{ content: md?.content }}
            codeStyle={codeStyle}
          />
        </div>
      </div>
    </BasicPage>
  );
}
