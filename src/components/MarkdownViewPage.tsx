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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="block shrink-0">
          <MarkdownNavbar
            source={md?.content || ''}
            ordered={true}
            headingTopOffset={84}
            className="bg-gray-100 dark:bg-gray-700 xl:sticky xl:top-24 xl:left-0"
          />
        </div>
        <div className="flex flex-col justify-center items-center mx-auto w-full mb-32">
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
