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
import { DraftBadge, RedLabel } from '@/components/PostCard';
import { now } from 'moment/moment';

export const SnippetBadge = () => (
  <Badge className="h-6 bg-orange-600 text-white hover:bg-orange-600">
    Snippet
  </Badge>
);

export const SnippetCard = ({ snippet }: { snippet: MarkdownFile }) => {
  const linkUrl = `/snippets/${snippet.metadata.title}`;
  const createdTime = moment(snippet.metadata.createdTime);
  const tags = snippet.metadata.tags ? snippet.metadata.tags.join(', ') : '';
  const category = snippet.metadata.category || '';
  const today = moment(now());
  const isNewPost = today.diff(createdTime, 'months') <= 1;

  return (
    <Link href={linkUrl}>
      <Card className="relative border-gray-400 bg-yellow-50 hover:border-2 hover:border-orange-500 hover:bg-yellow-100 hover:shadow-md dark:bg-gray-800">
        {isNewPost && <RedLabel />}
        <CardHeader>
          <div className="flex flex-row justify-between gap-2">
            <CardTitle>{snippet.metadata.title}</CardTitle>
            {snippet.metadata.draft ? <DraftBadge /> : <SnippetBadge />}
          </div>
          <CardDescription>
            <div className="inline text-lg text-foreground">{category}</div>
            <div>{tags}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between gap-2">
            <div>{snippet.metadata?.description}</div>
            <div className="flex justify-end">
              <div className="text-md">{createdTime.format('ll')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
