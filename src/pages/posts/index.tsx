import { getMarkdownFiles, paginateElements } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import { withListItemDecorator } from '@/lib/helper';
import { PostItem } from '@/components/PostItem';
import { BasicPage } from '@/components/BasicPage';

export async function getStaticProps() {
  const mdFiles = getMarkdownFiles();
  // const posts = mdFiles.filter((file) => file.metadata.category == 'posts');
  const posts = mdFiles.filter((md) => {
    const isPost = md.metadata.category == 'posts';
    const isNotDraft = md.metadata.draft == false;
    const env = process.env.NODE_ENV;

    switch (env) {
      case 'development':
        return isPost;
        break;
      case 'production':
        return isPost && isNotDraft;
        break;
      default:
        return isPost;
        break;
    }
  });
  const postGroups = paginateElements<MarkdownFile>(posts, 10);
  const pageIndex = 0;
  return { props: { mdFiles: postGroups[pageIndex] } };
}

export default function PostListPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  {
    const oddItemClasses = 'dark:bg-gray-800 dark:hover:bg-gray-700';
    const evenItemClasses =
      'bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600';

    const NavItems = mdFiles.map((file) => {
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
          All Posts
        </h1>
        <div className="flex flex-col gap-2 mx-auto">
          {withListItemDecorator(NavItems, {
            oddItemClasses: oddItemClasses,
            evenItemClasses: evenItemClasses,
          })}
        </div>
      </BasicPage>
    );
  }
}
