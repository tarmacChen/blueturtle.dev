import { RootLayout } from "@/components/RootLayout";
import MarkdownNavbar from "markdown-navbar";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { a11yDark as darkStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { InferGetStaticPropsType } from "next";
import { getStaticProps as getMarkdownProps } from "@/pages/articles/[postTitle]";

export default function MarkdownViewPage({
  md,
}: InferGetStaticPropsType<typeof getMarkdownProps>) {
  return (
    <RootLayout>
      <div className="flex flex-col">
        <div className="mb-8 mt-4">
          {/* <MarkdownNavbar
            source={md?.content || ''}
            ordered={true}
            lgheadingTopOffset={84}
            className="bg-gray-100 dark:bg-gray-800"
          /> */}
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
    </RootLayout>
  );
}
