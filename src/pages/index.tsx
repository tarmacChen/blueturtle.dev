import { PostCards } from '@/components/PostCard';
import { PostPagination } from '@/components/PostPagination';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BasicPage } from '@/components/BasicPage';
import { getStaticProps as pageIndexStaticProps } from '@/pages/page/[pageIndex]';
import { useState } from 'react';
import { paginateElements } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import { getAllCategories } from '@/lib/helper';
import { PostCategoryGroups } from '@/type';
import { SearchBar } from '@/components/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardStackIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { PostList } from '@/components/PostItem';
import { useMobile } from '@/hooks/useMobile';
import { CategorySelector } from '@/components/CategorySelector';

export const getStaticProps = (async (ctx) => {
  return pageIndexStaticProps(ctx);
}) satisfies GetStaticProps;

export default function PostCardsPage({
  posts,
  pageIndex = 1,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const getFilteredPosts = () => {
    if (selectedCategory == PostCategoryGroups['All Posts']) {
      return posts.filter((post) => post.metadata.type == 'post');
    }
    if (selectedCategory == PostCategoryGroups['All Snippets']) {
      return posts.filter((post) => post.metadata.type == 'snippet');
    }
    return posts.filter((post) => post.metadata.category == selectedCategory);
  };

  const foundPosts = getFilteredPosts().filter((post) => {
    const title = post.metadata.title || '';
    const desc = post.metadata.description || '';
    const tags = post.metadata.tags || [];
    const tagsText = tags.join('|');
    const searchPattern = new RegExp(search, 'ig');

    return (
      title.match(searchPattern) ||
      desc.match(searchPattern) ||
      tagsText.match(searchPattern)
    );
  });
  const paginations = paginateElements<MarkdownFile>(foundPosts, 5);
  const categories = getAllCategories(posts);
  const showPaginates =
    search == '' && selectedCategory == PostCategoryGroups['All Posts'];
  const showPosts = showPaginates ? paginations[pageIndex - 1] : foundPosts;
  const { isMobile } = useMobile();

  return (
    <BasicPage>
      <div className="mx-auto flex flex-col w-full max-md:w-full w-2/3 xl:w-1/2 justify-center gap-4">
        <SearchBar
          search={search}
          dispatch={setSearch}
        />

        <Tabs defaultValue="card">
          <div className="flex justify-between">
            <div className="w-1/3 max-sm:w-1/2">
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                dispatch={setSelectedCategory}
              />
            </div>
            <TabsList>
              <TabsTrigger
                value="card"
                className="flex gap-2">
                <CardStackIcon />
                {isMobile || 'Card'}
              </TabsTrigger>
              <TabsTrigger
                value="compact"
                className="flex gap-2">
                <ListBulletIcon />
                {isMobile || 'Compact'}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="card">
            <div className="flex flex-col gap-4">
              <PostCards posts={showPosts} />
            </div>
          </TabsContent>
          <TabsContent value="compact">
            <PostList posts={showPosts} />
          </TabsContent>
        </Tabs>

        {showPaginates && (
          <PostPagination
            posts={foundPosts}
            baseUrl="/page"
            currentIndex={pageIndex}
          />
        )}
      </div>
    </BasicPage>
  );
}
