'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PostDescription } from '@/type';
import { useEffect, useReducer, useState } from 'react';

export const PostCard = ({ post }: { post: PostDescription }) => {
  const postUrl = `/posts/${post.title}`;
  const tags = post.tags ? `${post.tags}` : '';

  return (
    <a href={postUrl}>
      <Card className="h-72">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{tags}</CardDescription>
        </CardHeader>
        <CardContent>{post.description}</CardContent>
      </Card>
    </a>
  );
};
