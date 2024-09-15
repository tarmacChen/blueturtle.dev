import { MarkdownFile } from 'mdman';
import { Separator } from './ui/separator';
import moment from 'moment';
import Link from 'next/link';

const MarkdownPostViewer = ({ md }: { md: MarkdownFile }) => {
  const createdTime = moment(md.metadata.createdTime);
  const url = `/posts/${md.metadata?.title}`;

  return (
    <div className="my-8 flex flex-col px-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold">
          <Link href={url}>{md.metadata.title}</Link>
        </h1>
        <p className="">{md.metadata.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-md text-gray-500">
          {createdTime.format('YYYY-MM-D')}
        </p>
        <Link
          href={url}
          className="text-sm">
          繼續閱讀...
        </Link>
      </div>
    </div>
  );
};

export const MarkdownListViewer = ({
  mds,
  pageIndex,
}: {
  mds: MarkdownFile[];
  pageIndex: number;
}) => {
  const MarkdownPosts = () =>
    mds.map((md, index) => {
      const isLastItem = index == mds.length - 1;

      return (
        <>
          <MarkdownPostViewer md={md} />
          {isLastItem == false && <Separator />}
        </>
      );
    });

  return <MarkdownPosts />;
};
