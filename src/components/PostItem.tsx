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
  const tags = file.metadata.tags?.map(tag => "#" + tag) || []
  const tagsCount = tags.length > 3 ? 3 : tags.length
  const tagNames = tags.slice(0, tagsCount).join(', ') + (tags.length > 3 ? '...' : '')
  const containerClasses = mergeClassNames(
    'hover:bg-blue-50',
    className || ''
  );

  return (
    <div
      className={containerClasses}
      key={file.filename}>
      <Link href={href}
            className="flex flex-col w-full border-b-2 p-2 border-dotted hover:border-b-blue-600 justify-between">
        <div>{file.metadata.title}</div>
        <div className="text-sm font-light ">{file.metadata.description}
          <div className="text-gray-600 text-right">{tagNames}</div>
          <div className="text-right">{createdTime}</div>
        </div>
      </Link>
    </div>
  );
};
