import { getMarkdownFiles, paginateElements } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import { withListItemDecorator } from '@/lib/helper';
import { PostItem } from '@/components/PostItem';
import { BasicPage } from '@/components/BasicPage';

export async function getStaticProps() {
  const mdFiles = getMarkdownFiles();
  const posts = mdFiles.filter((file) => file.metadata.category == 'posts');
  const postGroups = paginateElements<MarkdownFile>(posts, 10);
  const pageIndex = 0;
  return { props: { mdFiles: postGroups[pageIndex] } };
}

export default function PostsPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  {
    const oddItemClasses = 'bg-white';
    const evenItemClasses = 'bg-gray-50';

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
        <div className="flex flex-col gap-1 mx-auto ">
          {withListItemDecorator(NavItems, {
            oddItemClasses: oddItemClasses,
            evenItemClasses: evenItemClasses,
          })}
        </div>
      </BasicPage>
    );
  }
}
