import {
  Article,
  Blockquote,
  CodeBlock,
  Emphasis,
  Heading2,
  Heading3,
  Paragraph,
} from "@/article";
import { ArticleProp, articleProperties } from "@/components/articleProperties";
import { RootLayout } from "@/components/RootLayout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import path from "path";

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

  return (
    <RootLayout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <Article>
        <Heading2>版本控制對於 Web API 的重要性</Heading2>
        <Paragraph>
          假設有一支 API 呼叫後可以透過 Customer ID 得到客戶的資料
          <Emphasis>company.com/api/customer/001</Emphasis>
        </Paragraph>
        <CodeBlock language="json">{callApiBefore}</CodeBlock>
        <Paragraph>過幾天再呼叫同樣的 API 得到了不同的結果</Paragraph>
        <CodeBlock language="json">{callApiAfter}</CodeBlock>
        <Paragraph>
          API 的消費者 (Consumer) 會對這個改變感到很困擾，我預期呼叫 API
          後可以透過 name 得到客戶的姓名，但 API 的供應者 (Provider)
          一聲不吭地將 name 拆分成 firstName 與
          lastName，寫好的程式這下要調整了不然會找不到客戶的姓名
        </Paragraph>
        <Blockquote>
          Provider 正式對外發佈了 API
          就不要輕易改變回傳資料的格式，如果真的要調整可以將新的回傳格式發佈到新的版本接口中
        </Blockquote>
        <Heading2>如何實作版本控制</Heading2>
        <Heading3>用 URL 區分版本</Heading3>
        <Paragraph>
          我們可以在路由中加入版本控制符號，讓消費者可以預期回傳格式
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
        <Heading3>用 Parameter 區分版本</Heading3>
      </Article>
    </RootLayout>
  );
}
