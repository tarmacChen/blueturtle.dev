import { getMarkdownFiles } from '@/lib/staticHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import PostListPage from '@/pages/posts/index';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles().filter(
    (md) => md.metadata.type == 'snippet',
  );
  const env = process.env.NODE_ENV;
  const prodPosts = mdFiles.filter((md) => md.metadata.draft == false);
  const devPosts = mdFiles;
  const posts = env == 'development' ? devPosts : prodPosts;

  return { props: { mdFiles: posts } };
}) satisfies GetStaticProps;

export default function SnippetsPage({
  mdFiles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PostListPage
      mdFiles={mdFiles}
      title="All Snippets"
    />
  );
}
