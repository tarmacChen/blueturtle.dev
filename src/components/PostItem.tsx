import { mergeClassNames, withListItemDecorator } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import moment from 'moment';
import Link from 'next/link';
import { BasicPage } from '@/components/BasicPage';

export const PostItem = ({
  href,
  file,
  className,
}: {
  href: string;
  file: MarkdownFile;
  className?: string;
}) => {
  const createdTime = moment(file.metadata.createdTime).format('ll');
  const tags = file.metadata.tags?.map((tag) => '#' + tag) || [];
  const tagsCount = tags.length > 3 ? 3 : tags.length;
  const tagNames =
    tags.slice(0, tagsCount).join(', ') + (tags.length > 3 ? '...' : '');
  const containerClasses = mergeClassNames(className || '');

  return (
    <div
      className={containerClasses}
      key={file.filename}>
      <Link
        href={href}
        className="flex flex-col w-full border-gray-400 justify-between px-2 py-1">
        <div>{file.metadata.title}</div>
        <div className="text-right text-sm">{createdTime}</div>
      </Link>
    </div>
  );
};

export const PostList = ({
  posts,
  oddItemClassName = 'hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-800 hover:border-2 border-blue-500 bg-gray-100',
  evenItemClassName = 'hover:bg-blue-100 bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-700 hover:border-2 border-blue-500',
}: {
  posts: MarkdownFile[];
  oddItemClassName?: string;
  evenItemClassName?: string;
}) => {
  const PostItems = posts.map((post) => {
    const url = `/posts/${post.metadata?.title}`;
    return (
      <PostItem
        key={post.filename}
        href={url}
        file={post}
      />
    );
  });

  return (
    <div className="flex flex-col">
      {withListItemDecorator(PostItems, {
        oddItemClasses: oddItemClassName,
        evenItemClasses: evenItemClassName,
      })}
    </div>
  );
};
