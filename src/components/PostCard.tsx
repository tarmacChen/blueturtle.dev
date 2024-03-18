'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MarkdownFile } from '@/type';

export const PostCard = ({ mdFile }: { mdFile: MarkdownFile }) => {
  const meta = mdFile.data;
  const postUrl = `/posts/${meta?.title}`;

  return (
    <a href={postUrl}>
      <Card className="h-36">
        <CardHeader>
          <CardTitle>{meta?.title}</CardTitle>
          <CardDescription>{meta?.tags}</CardDescription>
        </CardHeader>
        <CardContent>{meta?.description}</CardContent>
      </Card>
    </a>
  );
};
