'use client';

import { PostDescription } from '@/type';
import { publicPosts } from '@/data/index';
import { useEffect, useState } from 'react';
import { MarkdownViewer } from './MarkdownViewer';

export default function PostsPage() {
  const [posts, setPosts] = useState<PostDescription[]>([]);

  useEffect(() => {
    setPosts(publicPosts);
  }, [posts]);

  return <MarkdownViewer posts={posts} />;
}
