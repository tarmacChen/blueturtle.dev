import { getMarkdownFiles } from '@/lib/helper';
import { MarkdownFile } from '@/type';
import { PostCard } from '../../components/PostCard';
import Layout from './layout';

export async function getStaticProps() {
  const mdFiles = getMarkdownFiles();
  return { props: { mdFiles } };
}

export default function PostsPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  console.log(mdFiles);
  return (
    <Layout>
      {mdFiles.map((file) => {
        return (
          <PostCard
            mdFile={file}
            key={file.filename}></PostCard>
        );
      })}
    </Layout>
  );
}
