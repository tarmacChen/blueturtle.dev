'use client';

import { PostDescription } from '@/type';
import { publicPosts } from '@/data/index';
import { useEffect, useState } from 'react';
import { PostCard } from './components/Post';
import { useSearchParams } from 'next/navigation';

export default function PostsPage() {
  const [posts, setPosts] = useState<PostDescription[]>([]);

  useEffect(() => {
    setPosts(publicPosts);
  }, [posts]);

  return (
    <>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </>
  );
}
