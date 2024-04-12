import { MarkdownFile } from 'mdman';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';

export const SnippetCard = ({ mdFile }: { mdFile: MarkdownFile }) => {
  const linkUrl = `/snippets/${mdFile.metadata.title}`;
  const createdTime = moment(mdFile.metadata.createdTime);
  const tags = mdFile.metadata.tags ? mdFile.metadata.tags.join(', ') : '';
  const SnippetBadge = () => (
    <Badge className="bg-orange-600 text-white h-6">Snippet</Badge>
  );

  return (
    <Link href={linkUrl}>
      <Card className="bg-yellow-50 dark:bg-gray-800 border-gray-400 dark:hover:border-blue-500 hover:bg-yellow-100 hover:border-black hover:shadow-md">
        <CardHeader>
          <div className="flex flex-row justify-between gap-2">
            <CardTitle>{mdFile.metadata.title}</CardTitle>
            <SnippetBadge />
          </div>
          <CardDescription>{tags}</CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-end">
          <div className="text-sm">{createdTime.format('ll')}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};
