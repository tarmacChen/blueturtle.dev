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
      return (
        <h1 className="underline decoration-2 underline-offset-8 text-primary bg-background">
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h2 className="text-primary bg-background">{children}</h2>;
    },
    h3: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h3 className="text-primary bg-background">{children}</h3>;
    },
    h4: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h4 className="text-primary bg-background">{children}</h4>;
    },
    h5: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h5 className="text-primary bg-background">{children}</h5>;
    },
    h6: ({ children, ...props }: { children: React.ReactNode }) => {
      return <h6 className="text-primary bg-background">{children}</h6>;
    },
    a: ({ children, ...props }: { children: React.ReactNode }) => {
      return <a className="text-primary bg-background">{children}</a>;
    },
    th: ({ children, ...props }: { children: React.ReactNode }) => {
      return (
        <th className="text-primary font-medium not-italic bg-gray-100 border-2 dark:border-gray-400 dark:bg-gray-700 dark:border-white">
          {children}
        </th>
      );
    },
    td: ({ children, ...props }: { children: React.ReactNode }) => {
      return (
        <td className="text-primary bg-background text-center border-2 dark:border-gray-400 dark:border-white">
          {children}
        </td>
      );
    },
    blockquote: ({ children, ...props }: { children: React.ReactNode }) => {
      return (
        <blockquote className="text-primary bg-background">
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
      const snippetStyle = [
        className,
        'mx-1 p-1 rounded-lg bg-gray-700 text-yellow-300',
      ].join(' ');

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
      return hasLang ? (
        <SyntaxHighlighter
          style={codeStyle}
          language={hasLang[1]}
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlight}>
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code
          className={snippetStyle}
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
          sizes="100vw"
          className="w-full h-auto"
          alt={alt}
        />
      );
    },
  };

  return (
    <Markdown
      className="w-full prose lg:prose-lg text-primary"
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      remarkPlugins={[remarkGfm, remarkGeomoji]}
      components={MarkdownComponent}>
      {md?.content ?? ''}
    </Markdown>
  );
};
