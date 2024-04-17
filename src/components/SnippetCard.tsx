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
import { DraftBadge } from '@/components/PostCard';

export const SnippetBadge = () => (
  <Badge className="bg-orange-600 text-white h-6 hover:bg-orange-600">
    Snippet
  </Badge>
);

export const SnippetCard = ({ snippet }: { snippet: MarkdownFile }) => {
  const linkUrl = `/snippets/${snippet.metadata.title}`;
  const createdTime = moment(snippet.metadata.createdTime);
  const tags = snippet.metadata.tags ? snippet.metadata.tags.join(', ') : '';

  return (
    <Link href={linkUrl}>
      <Card className="bg-yellow-50 dark:bg-gray-800 border-gray-400 dark:hover:border-blue-500 hover:bg-yellow-100 hover:border-black hover:shadow-md">
        <CardHeader>
          <div className="flex flex-row justify-between gap-2">
            <CardTitle>{snippet.metadata.title}</CardTitle>
            {snippet.metadata.draft ? <DraftBadge /> : <SnippetBadge />}
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
