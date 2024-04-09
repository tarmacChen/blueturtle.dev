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
      <Card className="bg-yellow-50 border-gray-600 hover:shadow-xl hover:border-black hover:bg-yellow-100">
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
