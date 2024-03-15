'use client';

import { PostCategoryType, PostDescription } from '@/type';
import { publicPosts } from '@/data/index';
import { useEffect, useState } from 'react';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { PostSelector } from '../components/PostSelector';

export default function PostsPage() {
  const [posts, setPosts] = useState<PostDescription[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    setPosts(publicPosts);
  }, [posts]);

  const selectedPostChangedHandler = (value: string) => {
    const foundPost = posts.find((p) => p.title == value);
    if (foundPost?.title != undefined) {
      setContent(foundPost?.content);
    }
  };

  return (
    <>
      <PostSelector
        posts={posts}
        valueChangeHandler={selectedPostChangedHandler}
      />
      <MarkdownViewer content={content} />
    </>
  );
}
