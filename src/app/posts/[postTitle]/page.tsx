'use client';

import { usePathname } from 'next/navigation';
import { MarkdownViewer } from '../components/MarkdownViewer';
import { publicPosts } from '@/data/index';

export default function PostViewerPage() {
  const pathname = usePathname().split('/').pop();
  const postTitle = decodeURI(pathname || '');
  const foundPost = publicPosts.find((post) => post.title == postTitle);

  return <MarkdownViewer content={foundPost?.content} />;
}
