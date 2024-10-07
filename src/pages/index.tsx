import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { RootLayout } from "@/components/RootLayout";
import { getStaticProps as pageIndexStaticProps } from "@/pages/page/[pageIndex]";
import { useState } from "react";
import { paginateElements } from "@/lib/helper";
import { MarkdownFile } from "mdman";
import { getAllCategories } from "@/lib/helper";
import { PostCategoryGroups } from "@/type";
import { MarkdownListViewer } from "@/components/MarkdownListViewer";
import ArticlesSection from "../components/articles-section";

export const getStaticProps = (async (ctx) => {
  return pageIndexStaticProps(ctx);
}) satisfies GetStaticProps;

export default function PostCardsPage({
  posts,
  pageIndex = 1,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState("");
  const defaultCategory = "All Posts";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  // const defaultCategory = 'Show All';

  const getFilteredPosts = () => {
    if (selectedCategory == PostCategoryGroups["All Posts"]) {
      return posts.filter((post) => post.metadata.type == "post");
    }
    if (selectedCategory == PostCategoryGroups["All Snippets"]) {
      return posts.filter((post) => post.metadata.type == "snippet");
    }
    if (selectedCategory == "Show All") {
      return posts;
    }
    return posts.filter((post) => post.metadata.category == selectedCategory);
  };

  const foundPosts = getFilteredPosts().filter((post) => {
    const title = post.metadata.title || "";
    const desc = post.metadata.description || "";
    const tags = post.metadata.tags || [];
    const tagsText = tags.join("|");
    const searchPattern = new RegExp(search, "ig");

    return (
      title.match(searchPattern) ||
      desc.match(searchPattern) ||
      tagsText.match(searchPattern)
    );
  });
  const paginates = paginateElements<MarkdownFile>(foundPosts, 5);
  const categories = getAllCategories(posts);
  const showPaginates =
    search == "" && selectedCategory == PostCategoryGroups["All Posts"];
  const showPosts = showPaginates ? paginates[pageIndex - 1] : foundPosts;

  // return (
  //   <RootLayout>
  //     <MarkdownListViewer
  //       mds={foundPosts}
  //       pageIndex={pageIndex}
  //     />
  //   </RootLayout>
  // );

  return (
    <RootLayout>
      <ArticlesSection />
    </RootLayout>
  );
}
