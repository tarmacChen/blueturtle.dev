import { getMarkdownFiles } from '@/lib/mdHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import PostListPage from '@/pages/posts/index';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles();
  const env = process.env.NODE_ENV;
  const prodPosts = mdFiles.filter(
    (md) => md.metadata.category == 'snippets' && md.metadata.draft == false,
  );
  const devPosts = mdFiles.filter((md) => md.metadata.category == 'snippets');
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
