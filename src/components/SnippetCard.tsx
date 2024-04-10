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

export const SnippetCard = ({ mdFile }: { mdFile: MarkdownFile }) => {
  const linkUrl = `/snippets/${mdFile.metadata.title}`;
  const createdTime = moment(mdFile.metadata.createdTime);
  const tags = mdFile.metadata.tags ? mdFile.metadata.tags.join(', ') : '';

  return (
    <Link href={linkUrl}>
      <Card className="bg-yellow-50 dark:bg-gray-800 border-primary hover:bg-yellow-100 hover:border-blue-600">
        <CardHeader>
          <CardTitle>{mdFile.metadata.title}</CardTitle>
          <CardDescription>{tags}</CardDescription>
        </CardHeader>
        <CardContent>{mdFile.metadata.description}</CardContent>
        <CardFooter className="w-full justify-end">
          {createdTime.format('ll')}
        </CardFooter>
      </Card>
    </Link>
  );
};
