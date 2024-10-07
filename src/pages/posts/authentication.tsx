import { Article, Header } from "@/article";
import { ArticleProps, articles } from "@/components/articles";
import { RootLayout } from "@/components/RootLayout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = (async (ctx) => {
  const filename = "authentication";

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
      </Article>
    </RootLayout>
  );
}
