import { BasicPage } from '@/components/BasicPage';
import { getMarkdownFiles, TranspileMarkdownFile } from '@/lib/staticHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { a11yDark as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles();
  const md = mdFiles.find((md) => md.filename.includes('contact'));
  md && TranspileMarkdownFile(md);

  if (md == undefined) {
    return { props: {} };
  } else {
    return { props: { mdFile: md } };
  }
}) satisfies GetStaticProps;

export default function ContactPage({
  mdFile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BasicPage>
      {mdFile && (
        <MarkdownViewer
          md={mdFile}
          codeStyle={codeStyle}
        />
      )}
    </BasicPage>
  );
}
