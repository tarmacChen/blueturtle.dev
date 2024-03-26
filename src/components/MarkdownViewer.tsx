import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
import remarkGeomoji from "remark-gemoji"
import rehypeSlug from "rehype-slug"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import rangeParser from "parse-numeric-range"
import { MarkdownTypes, MarkdownNode } from "@/type"

const CodeSnippet = ({
  className,
  children,
  ...props
}: {
  className?: string
  children?: React.ReactNode
}) => {
  const codeSnippetStyle = [
    className,
    "mx-1 p-1 rounded-lg bg-gray-700 text-yellow-300",
  ].join(" ")
  console.log(className)

  return (
    <code className={codeSnippetStyle} {...props}>
      {children}
    </code>
  )
}

export const MarkdownViewer = ({ markdown, codeStyle }: MarkdownTypes) => {
  const MarkdownComponent: Object = {
    code({
      node,
      inline,
      className,
      ...props
    }: {
      node: MarkdownNode
      inline: boolean
      className: string
      [key: string]: any
    }) {
      const hasLang = /language-(\w+)/.exec(className || "")
      const hasMeta = node?.data?.meta

      const applyHighlight = (lineNumber: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/
          const metadata = node.data.meta.replace(/s/g, "")
          let strLineNumber = "0"
          if (RE.test(metadata)) {
            const match = RE.exec(metadata)
            if (match) {
              strLineNumber = match[1]
            }
          }
          const highlightLines = rangeParser(strLineNumber)
          const highlight = highlightLines
          const data = highlight.includes(lineNumber) ? "highlight" : undefined
          return { data }
        } else {
          return {}
        }
      }
      return hasLang ? (
        <SyntaxHighlighter
          style={codeStyle}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlight}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <CodeSnippet className={className} {...props}></CodeSnippet>
      )
    },
  }

  return (
    <Markdown
      className="prose max-md:prose-sm w-full"
        rehypePlugins={[rehypeRaw, rehypeSlug]}
      remarkPlugins={[remarkGfm, remarkToc, remarkGeomoji]}
      components={MarkdownComponent}
    >
      {markdown?.content ?? ""}
    </Markdown>
  )
}
