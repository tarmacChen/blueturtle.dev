import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export const MarkdownViewer = ({ content }: { content?: string }) => {
  return (
    <ReactMarkdown
      className="prose xl:prose-xl"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      children={content}
    />
  );
};
