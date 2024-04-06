import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import { getMarkdownFiles, TranspileMarkdownFile } from '@/lib/mdHelper';
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
  foundFile && TranspileMarkdownFile(foundFile);

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
        <div className="block shrink-0 lg:px-8 max-md:px-8 max-lg:px-16">
          <MarkdownNavbar
            source={md?.content || ''}
            ordered={true}
            headingTopOffset={84}
            className="xl:sticky xl:top-24 xl:left-0 bg-gray-100"
          />
        </div>
        <div className="flex flex-col justify-center items-center mx-auto w-full max-md:px-8">
          {md && (
            <MarkdownViewer
              md={md}
              codeStyle={codeStyle}
            />
          )}
        </div>
      </div>
    </BasicPage>
  );
}
