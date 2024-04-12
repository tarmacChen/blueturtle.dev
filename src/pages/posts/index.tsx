import { getMarkdownFiles } from '@/lib/mdHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { withListItemDecorator } from '@/lib/helper';
import { PostItem } from '@/components/PostItem';
import { BasicPage } from '@/components/BasicPage';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles();
  const env = process.env.NODE_ENV;
  const devPosts = mdFiles.filter((md) => md.metadata.category == 'posts');
  const prodPosts = mdFiles.filter(
    (md) => md.metadata.category == 'posts' && md.metadata.draft == false,
  );
  const posts = env == 'development' ? devPosts : prodPosts;

  return { props: { mdFiles: posts, title: 'All Posts' } };
}) satisfies GetStaticProps;

export default function PostListPage({
  mdFiles,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  {
    const oddItemClasses =
      'hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-800 hover:border-2 border-blue-500';
    const evenItemClasses =
      'hover:bg-blue-100 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 hover:border-2 border-blue-500';

    const PostItems = mdFiles.map((file) => {
      const url = `/posts/${file.metadata?.title}`;
      return (
        <PostItem
          key={file.filename}
          href={url}
          file={file}
        />
      );
    });

    return (
      <BasicPage>
        <h1 className="text-2xl border-b-2 pl-2 mb-2 border-b-gray-300">
          {title}
        </h1>
        <div className="flex flex-col mx-auto">
          {withListItemDecorator(PostItems, {
            oddItemClasses: oddItemClasses,
            evenItemClasses: evenItemClasses,
          })}
        </div>
      </BasicPage>
    );
  }
}