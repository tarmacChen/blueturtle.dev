import {
  Article,
  Blockquote,
  CodeBlock,
  Emphasis,
  Header,
  Heading2,
  Heading3,
  Heading4,
  ListItems,
  Paragraph,
} from "@/article";
import { ArticleProp, articleProperties } from "@/components/articleProperties";
import { RootLayout } from "@/components/RootLayout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = (async (ctx) => {
  const filename = "webapi-version-control";

  const article = articleProperties.find(
    (article) => article.href === `/articles/${filename}`,
  );

  return { props: { article: article } };
}) satisfies GetStaticProps<{
  article: ArticleProp | undefined;
}>;

export default function Page({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (article === undefined) return <></>;

  const callApiBefore = `{
  "id": "001",
  "name": "Jack Johnson",
}`;
  const callApiAfter = `{
  "id": "001",
  "firstName": "Jack",
  "lastName": "Johnson",
}`;
  const apiCode = `const express = require('express');
const app = express();

app.get('/customer/:id', function (req, res) {
  const version = req.query.v;

  if (version == 1) {
    // do something when consumer call api version 1
  }
  if (version == 2) {
    // do something when consumer call api version 2
  }

  // when api version is empty or other value, need to handle it (prevent exception)
}`;

  return (
    <RootLayout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <Article>
        <Header {...article}></Header>
        <Heading2>版本控制對於 Web API 的重要性</Heading2>
        <Paragraph>假設有一支 API 呼叫後可以得到客戶的資料</Paragraph>
        <CodeBlock
          language="json"
          specificLanguageName="company.com/api/customer/001"
          showLanguageName>
          {callApiBefore}
        </CodeBlock>
        <Paragraph>過了幾天再呼叫同樣的 API 卻得到了不同的回傳結果</Paragraph>
        <CodeBlock
          language="json"
          specificLanguageName="company.com/api/customer/001"
          showLanguageName>
          {callApiAfter}
        </CodeBlock>
        <Paragraph>
          消費者 (Consumer) 會對這個改變感到很困擾，原本預期呼叫 API 可以透過
          name 得到客戶的姓名，但供應者 (Provider) 一聲不吭地將 name 拆分成
          firstName 與 lastName，有用到這個 API
          的程式這下子要緊急調整了不然會找不到客戶的姓名
        </Paragraph>
        <Blockquote>
          供應者對外正式發佈了 API
          就不要輕易調整規格，如果真的必須要調整可以將新的規格放到下一個版本中實作
        </Blockquote>
        <Heading2>撰寫 Web API 文件</Heading2>
        <Paragraph>
          撰寫文件可以幫助團隊檢視思考目前的 API
          功能符不符合實際所需？如果有重複的功能或接口要不要調整？可以用 Swagger
          之類的工具幫助你寫出標準化的文件產出漂亮的頁面
        </Paragraph>

        <Heading2>如何實作 Web API 的版本控制</Heading2>
        <Heading3>用 Route 區分版本</Heading3>
        <Paragraph>
          我們可以在路由中加入版本控制符號讓消費者自己選擇要呼叫的版本
        </Paragraph>
        <CodeBlock
          language="json"
          specificLanguageName="company.com/api/v1/customer/001"
          showLanguageName>
          {callApiBefore}
        </CodeBlock>
        <CodeBlock
          language="json"
          specificLanguageName="company.com/api/v2/customer/001"
          showLanguageName>
          {callApiAfter}
        </CodeBlock>
        <Heading3>用 Domain name 區分版本</Heading3>
        <CodeBlock
          language="json"
          specificLanguageName="v1.api.company.com/customer/001"
          showLanguageName>
          {callApiBefore}
        </CodeBlock>
        <CodeBlock
          language="json"
          specificLanguageName="v2.api.company.com/customer/001"
          showLanguageName>
          {callApiAfter}
        </CodeBlock>
        <Paragraph>當然也可以用不同的命名風格</Paragraph>
        <ListItems className="list-disc">
          <li>api.v1.company.com</li>
          <li>company.com.api.v1</li>
        </ListItems>
        <Heading4>副作用</Heading4>
        <Paragraph>
          Domain name 的改變帶來的副作用遠比隨意更改 API
          的規格來得更嚴重，如果沒有特別的需求應該要盡量避免使用這種方式
        </Paragraph>
        <ListItems className="leading-loose">
          <li>網域的維護成本 (網域租用費用、憑證到期替換)</li>
          <li>網域若變更了要如何通知既有的使用者做更新？</li>
          <li>
            跨網域呼叫的問題
            (也許需要的功能在特定版本中不存在，需要同時呼叫多個版本)
          </li>
        </ListItems>
        <Heading3>用 Parameter 區分版本</Heading3>
        <CodeBlock
          language="json"
          specificLanguageName="api.company.com/customer/001?v=1"
          showLanguageName>
          {callApiBefore}
        </CodeBlock>
        <CodeBlock
          language="json"
          specificLanguageName="api.company.com/customer/001?v=2"
          showLanguageName>
          {callApiAfter}
        </CodeBlock>
        <Paragraph>當然也可以用不同的命名風格</Paragraph>
        <ListItems className="list-disc leading-loose">
          <li>api.company.com/customer/001?version=1</li>
          <li>api.company.com/customer/001?apiversion=1</li>
          <li>api.company.com/customer/001?api=v1</li>
        </ListItems>
        <CodeBlock
          language="javascript"
          showLanguageName>
          {apiCode}
        </CodeBlock>
        <Heading4>副作用</Heading4>
        <ListItems className="leading-loose">
          <li>需要在每個接口的代碼內加上對版本參數的判斷來辨識呼叫的版本</li>
          <li>
            版本參數的名稱要儘早確定下來，若版本參數的名稱變更了對供應者及消費者都會造成衝擊
          </li>
          <li>若 API 接收到錯誤的版本參數名稱要如何處理？</li>
        </ListItems>

        <Heading2>找到最適合的解決方案</Heading2>
        <Paragraph>
          這次介紹了三種 Web API 版本控制的實作方法，依我目前的理解程度來看用
          <span className="mx-1 font-semibold underline">Route 來區分版本</span>
          這個方法來實作後續會比較好維護，但還是要依照實際的情況來看跟團隊一起討論出最適合的解決方案，每個方法都有它的
          <span className="mx-1 font-semibold">Pros & Cons</span>
          ，沒有最好的只有最適合的方法，保持開放的心態學習接受不同的意見，在每一次失敗的經驗中學到教訓用有效的方法防範未來繼續發生，才是最重要的課題
        </Paragraph>
      </Article>
    </RootLayout>
  );
}
