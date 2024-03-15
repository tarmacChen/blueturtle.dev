import { PostDescription } from '@/type';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { PostSelector } from './PostSelector';

export const MarkdownViewer = ({ posts }: { posts: PostDescription[] }) => {
  const [content, setContent] = useState<string | undefined>('');

  const selectedChangeHandler = (value: string) => {
    const foundPost = posts.find((p) => p.title == value);
    setContent(foundPost?.content);
  };

  const Viewer = () => {
    return (
      <ReactMarkdown
        className="prose xl:prose-xl"
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        children={content}
      />
    );
  };

  return (
    <>
      <PostSelector
        posts={posts}
        onChange={selectedChangeHandler}
      />
      <Viewer />
    </>
  );
};
