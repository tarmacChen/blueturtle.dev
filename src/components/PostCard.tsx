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

export const PostCard = ({ mdFile }: { mdFile: MarkdownFile }) => {
  const meta = mdFile.metadata;
  const linkUrl = `/posts/${meta?.title}`;
  const createdTime = moment(meta.createdTime);
  const tags = meta.tags ? meta.tags.join(', ') : '';

  const DraftBadge = () => <Badge className="bg-red-600 h-6">Draft</Badge>;

  return (
    <Link href={linkUrl}>
      <Card className="hover:border-blue-600 hover:bg-blue-50 hover:shadow-md">
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle>{meta?.title}</CardTitle>
            {meta.draft && <DraftBadge />}
          </div>
          <CardDescription>{tags}</CardDescription>
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
