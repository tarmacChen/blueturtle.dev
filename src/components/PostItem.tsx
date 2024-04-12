import { mergeClassNames } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import moment from 'moment';
import Link from 'next/link';

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
        className="p-2 flex flex-row w-full border-gray-400 hover:border-blue-600 justify-between dark:hover:border-2 dark:hover:border-blue-500">
        <div>{file.metadata.title}</div>
        <div className="text-right text-sm">{createdTime}</div>
      </Link>
    </div>
  );
};
