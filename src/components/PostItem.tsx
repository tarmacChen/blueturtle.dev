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
  const tags = file.metadata?.tags ? file.metadata?.tags.join(', ') : '';
  const containerClasses = mergeClassNames(
    'flex flex-row w-full hover:bg-blue-50',
    className || ''
  );

  return (
    <div
      className={containerClasses}
      key={file.filename}>
      <Link
        href={href}
        className="flex flex-row w-full border-b-2 p-2 border-dotted hover:border-b-blue-600 justify-between">
        <div className="flex flex-col">
          <div>{file.metadata.title}</div>
          <div className="text-sm font-light text-gray-600">
            {file.metadata.description}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm ">{createdTime}</div>
          <div className="text-sm font-light text-gray-600">{tags}</div>
        </div>
      </Link>
    </div>
  );
};
