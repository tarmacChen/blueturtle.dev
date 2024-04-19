import { BasicPage } from '@/components/BasicPage';
import MarkdownNavbar from 'markdown-navbar';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { a11yDark as darkStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { InferGetStaticPropsType } from 'next';
import { getStaticProps as getMarkdownProps } from '@/pages/posts/[postTitle]';

export default function MarkdownViewPage({
  md,
}: InferGetStaticPropsType<typeof getMarkdownProps>) {
  return (
    <BasicPage>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="block shrink-0">
          <MarkdownNavbar
            source={md?.content || ''}
            ordered={true}
            headingTopOffset={84}
            className="bg-gray-100 dark:bg-gray-800 xl:sticky xl:left-0 xl:top-20"
          />
        </div>
        <div className="mx-auto mb-32 flex w-full flex-col items-center justify-center">
          {md && (
            <MarkdownViewer
              md={md}
              codeStyle={darkStyle}
            />
          )}
        </div>
      </div>
    </BasicPage>
  );
}
