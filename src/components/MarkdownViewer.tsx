import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkGeomoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import rangeParser from 'parse-numeric-range';
import { MarkdownTypes, MarkdownNode } from '@/type';
import Image from 'next/image';

export const MarkdownViewer = ({ md, codeStyle }: MarkdownTypes) => {
  const MarkdownComponent: Object = {
    h1: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h1 className="bg-background text-primary">{children}</h1>;
    },
    h2: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h2 className="bg-background text-primary">{children}</h2>;
    },
    h3: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h3 className="bg-background text-primary">{children}</h3>;
    },
    h4: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h4 className="bg-background text-primary">{children}</h4>;
    },
    h5: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h5 className="bg-background text-primary">{children}</h5>;
    },
    h6: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h6 className="bg-background text-primary">{children}</h6>;
    },
    a: ({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
    }) => {
      return (
        <a
          className="bg-background text-primary"
          href={href}
          target="_blank">
          {children}
        </a>
      );
    },
    th: ({ children, ...props }: { children: React.ReactNode }) => {
      return (
        <th className="border-2 bg-gray-100 font-medium not-italic text-primary dark:border-gray-400 dark:border-white dark:bg-gray-700">
          {children}
        </th>
      );
    },
    td: ({ children, ...props }: { children: React.ReactNode }) => {
      return (
        <td className="border-2 bg-background text-center text-primary dark:border-gray-400 dark:border-white">
          {children}
        </td>
      );
    },
    blockquote: ({ children, ...props }: { children: React.ReactNode }) => {
      return (
        <blockquote className="border-orange-400 bg-yellow-100 py-1 text-primary dark:border-green-500 dark:bg-gray-700">
          {children}
        </blockquote>
      );
    },
    pre: ({ children, ...props }: { children: React.ReactNode }) => {
      return <div>{children}</div>;
    },
    code: ({
      node,
      inline,
      className,
      ...props
    }: {
      node: MarkdownNode;
      inline: boolean;
      className: string;
      [key: string]: any;
    }) => {
      const hasLang = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;
      const applyHighlight = (lineNumber: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta.replace(/s/g, '');
          let strLineNumber = '0';
          if (RE.test(metadata)) {
            const match = RE.exec(metadata);
            if (match) {
              strLineNumber = match[1];
            }
          }
          const highlightLines = rangeParser(strLineNumber);
          const highlight = highlightLines;
          const data = highlight.includes(lineNumber) ? 'highlight' : undefined;
          return { data };
        } else {
          return {};
        }
      };

      // Remove empty line on end of code block
      const codeLines: string[] = props.children.split('\n');
      if (codeLines[codeLines.length - 1] == '') codeLines.pop();
      const codeContent = codeLines.join('\n');

      return hasLang ? (
        <SyntaxHighlighter
          style={codeStyle}
          language={hasLang[1]}
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlight}>
          {codeContent}
        </SyntaxHighlighter>
      ) : (
        <code
          className="mx-1 rounded-md bg-gray-700 px-2 py-1 font-normal text-lime-400 before:content-none after:content-none"
          {...props}></code>
      );
    },
    img: ({
      node,
      src,
      inline,
      className,
      alt,
      ...props
    }: {
      node: MarkdownNode;
      src: string;
      inline: boolean;
      className: string;
      alt: string;
      [key: string]: any;
    }) => {
      // remove 'public' in static file url
      const imageSource = src.includes('public')
        ? '/' + src.split('/').slice(2).join('/')
        : src;

      return (
        <Image
          src={imageSource}
          width={0}
          height={0}
          // sizes="100vw"
          className="h-auto w-full"
          alt={alt}
        />
      );
    },
  };

  return (
    <Markdown
      className="prose w-full text-primary lg:prose-lg"
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      remarkPlugins={[remarkGfm, remarkGeomoji]}
      components={MarkdownComponent}>
      {md?.content ?? ''}
    </Markdown>
  );
};
