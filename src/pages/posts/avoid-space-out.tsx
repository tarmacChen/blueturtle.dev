import {
  Article,
  Blockquote,
  Emphasis,
  Header,
  Heading2,
  Paragraph,
} from "@/article";
import { RootLayout } from "@/components/RootLayout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ArticleProps, articles } from "../../components/articles";

export const getStaticProps = (async (ctx) => {
  const filename = "avoid-space-out";

  const article = articles.find(
    (article) => article.href === `/posts/${filename}`,
  );

  return { props: { article: article } };
}) satisfies GetStaticProps<{
  article: ArticleProps | undefined;
}>;

export default function Page({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (article === undefined) return <></>;

  const title = article.title;
  const description = article.description;
  const createdDate = article.posted;

  return (
    <RootLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Article>
        <Header {...article}></Header>
        <Blockquote>
          我經常會在處理一件事的時候用力過頭一口氣把全部的精力投入進去，過度思考問題把事情複雜化，最後衍生出來的更多事情淹沒自己然後想要放棄，這個習慣不但對我的生產力有害且每一次挫敗的經驗長久下來會傷害我的身心健康，我想要先用
          <span className="mx-1 font-bold underline underline-offset-2">
            限制資源
          </span>
          這個方法試著不要讓我在處理事情的時候失去控制
        </Blockquote>
        <Heading2>限制資源</Heading2>
        <Paragraph>
          例如可以試著在每次處理事情的時候限制自己只花 30
          分鐘的時間處理，每個工作依難度及大小而定可能需要執行好幾輪才能完成，如果這次消耗掉執行單位卻沒有完成工作是正常的，這只是一件事情在處理時發生的過程
        </Paragraph>
        <Heading2>正向回饋</Heading2>
        <Paragraph>
          期待每次事情處理完成後都能得到完美的成果是沒有必要的，把追求完美的性格暫時放一旁，享受工作過程中帶來的體驗與正向回饋，不好的地方可以事後檢討等到下次投入資源時再予以調整
        </Paragraph>
      </Article>
    </RootLayout>
  );
}
