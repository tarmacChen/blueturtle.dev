---
title: test
author: john
draft: true
---

## Contents

# test

## heading 2

```js
import fs from "fs"

function logger() {
  console.log(123)
}

console.log(123)
```

```js
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import rangeParser from "parse-numeric-range"
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface Node {
  [key: string]: any
  type: string
  value: string
}

const theme = materialOceanic

export const MarkdownComponent: Object = {
  code({
    node,
    inline,
    className,
    ...props
  }: {
    node: Node
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
        style={theme}
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

```

| title | desc | third |
| :---: | :--: | ----- |
|   1   |  2   | 3     |
|   1   |  2   | 3     |
|   1   |  2   | 3     |
|   1   |  2   | 3     |
|   1   |  2   | 3     |

## ...
