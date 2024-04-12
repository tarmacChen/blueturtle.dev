import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarkdownFile } from 'mdman';
import moment from 'moment';
import Link from 'next/link';

export const DraftBadge = () => (
  <Badge className="bg-red-600 h-6 text-white">Draft</Badge>
);
export const PostBadge = () => (
  <Badge className="bg-blue-600 h-6 text-white">Post</Badge>
);

export const PostCard = ({ mdFile }: { mdFile: MarkdownFile }) => {
  const meta = mdFile.metadata;
  const linkUrl = `/posts/${meta?.title}`;
  const createdTime = moment(meta.createdTime);
  const tags = meta.tags ? meta.tags.join(', ') : '';

  return (
    <Link href={linkUrl}>
      <Card className="bg-gray-50 border-gray-400 dark:border-gray-300 dark:bg-gray-800 hover:border-black hover:bg-blue-50 hover:shadow-md dark:hover:border-blue-500">
        <CardHeader>
          <div className="flex flex-row justify-between gap-2">
            <CardTitle>{meta?.title}</CardTitle>
            {meta.draft ? <DraftBadge /> : <PostBadge />}
          </div>
          <CardDescription className="dark:text-gray-300">
            {tags}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>{meta?.description}</div>
            <div className="flex flex-row justify-end">
              <div className="text-sm">{createdTime.format('ll')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
