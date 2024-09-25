---
title: 返璞歸真
author: tarmac
type: post
category: post
description: ''
tags:
  - ''
keywords:
  - ''
cover: ''
coverFigure: ''
draft: false
createdTime: '2024-09-23T21:20:59.330Z'
---

## {{ title }}

### Markdown 驅動文章頁面

最近在寫文章時對於添加圖片這件事很困擾，自從 `blueturtle.dev` 採取`由 Markdown 檔案去產生文章頁面`的解決方案，對於文章頁面的渲染結果我一直都不是很滿意，這套工作流運作起來很流暢，只需要專注在撰寫內容本身然後管理好每個文章對應的 md 檔，其他跟文章有關的資料（主旨、文章類別、標籤...）放到 Metadata 裡面，剩下的都不用手動介入，Next.js 會幫我遍歷 md 檔案建立好靜態路由、渲染頁面、產生超連結到文章列表裡，從結果來看確實達成了當初想要的效果

### 新增圖片是一場災難

如果只是撰寫純文字的文章內容沒有太大的問題，但只要想新增圖片就是一場災難，在 Markdown 裡面新增圖片的語法像是這樣

```Markdown
![Title](/public/picture.png)
```

在 Markdown 語法裡面無法調整圖片大小更無法調整擺放位置，像是`文字在左, 圖片在右`或其他文繞圖排版效果都沒有辦法實現，可以透過調整程式去改變圖片大小，但這麼做並沒有從根本解決問題，我想實現的是在撰寫文章的當下就能自行調整圖片大小及排版

下面是有關讀取 Markdown 內容轉換成 HTML 頁面的程式碼

```typescript
export const MarkdownViewer = ({ md, codeStyle }: MarkdownTypes) => {
  const MarkdownComponent: Object = {
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
      return (
        <Image
          src={src}
          width={0}
          height={0}
          sizes="100vw"
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
```

### 尋找解決方案

擴展語法或引用其他插件或許是可行的方法，但這就失去了用 Markdown 撰寫文章的意義，有極大的可能我折騰了許多時間最後只會得到一個堪用的效果，不停的往輕量化標記語言添加新功能，這個`特殊版本的 Markdown`還失去了可攜性，無法帶到其他平台使用

### 最理想的結果

要怎麼做才能在撰寫文章時不折騰太多時間調整版型又保留後續調整的彈性呢？把每一篇文章獨立成各自的`.tsx檔`來管理似乎是個不錯的做法，跟原本的方案比起來像在開倒車但因為原本就有用 Next.js，要組織這些東西比起傳統的網頁應用程式要來的簡單很多

---

![文繞圖效果](/public/img/bobograss-layout.png)

---

```typescript
import { Article, Picture, TextWrap } from '@/components/article'

export default function Page() {
  const title = '彰化秘境私藏旅行'
  const address = "彰化縣田尾鄉"
  const caption = '毛茸茸的田尾波波草'
  const content = '讓可愛的波波草療癒疲累的心靈吧'
  const picture = <Picture figure={caption} src='/bobograss.jpg' width="70%"/>

  return (
    <Article title={title} location={address}>
      <TextWrap layout='topRight'>{content}</TextWrap>
    </Article>
  )
```

### 現行的文章渲染結果

再回過頭來看用現行的機制去渲染文章會得到什麼結果

---

### 彰化秘境私藏旅行

彰化縣田尾鄉

讓可愛的波波草療癒疲累的心靈吧

![彰化波波草](/public/img/cover/bobograss.jpg)

> 毛茸茸的田尾波波草

---

```Markdown
# 彰化秘境私藏旅行

彰化縣田尾鄉

讓可愛的波波草療癒疲累的心靈吧

![彰化波波草](/public/img/cover/bobograss.jpg)

> 毛茸茸的田尾波波草
```

不管怎麼組織文章結構或調整程式都無法得到剛剛那個最理想的結果，寫文章時只能用 `heading`, `paragraph`, `image`, `blockquote` 這些基本元素去組織內容，我很難透過在元素上添加香料來改變整個排版結果，直接在 Markdown 裡加入 HTML 元素也不是很理想

### 後續的移植工作

再來還有一些工作要做...

- 建立組成文章內容的元件
- 把 md 檔移植到 \*.tsx 裡
- 拿掉跟靜態路由有關的程式碼 (`getStaticPaths`, `getStaticProps`)
- 重新組織文章列表
