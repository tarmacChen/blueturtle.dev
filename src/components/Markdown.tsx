import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import rangeParser from "parse-numeric-range"
import { MarkdownTypes, MarkdownNode } from "@/type"

export const MarkdownViewer = ({ markdown, style }: MarkdownTypes) => {
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
          style={style}
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
        <code className={className} {...props}></code>
      )
    },
  }

  return (
    <Markdown
      className="prose prose-xl "
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkToc]}
      components={MarkdownComponent}
    >
      {markdown?.content ?? ""}
    </Markdown>
  )
}
