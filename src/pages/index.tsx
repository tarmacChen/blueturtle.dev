import { PostCard } from '@/components/PostCard';
import { PostPagination } from '@/components/PostPagination';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { BasicPage } from '@/components/BasicPage';
import { getStaticProps as pageIndexStaticProps } from '@/pages/page/[pageIndex]';
import { SnippetCard } from '@/components/SnippetCard';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { paginateElements } from '@/lib/helper';
import { MarkdownFile } from 'mdman';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { getAllCategories } from '@/lib/helper';
import { useCategorySelector } from '@/hooks/useCategorySelector';
import { PostCategoryGroups } from '@/type';

export const getStaticProps = (async (ctx) => {
  return pageIndexStaticProps(ctx);
}) satisfies GetStaticProps;

const PostCards = ({ posts }: { posts: MarkdownFile[] }) => {
  return posts?.map((post) => {
    {
      const card =
        post.metadata.type == 'post' ? (
          <PostCard post={post} />
        ) : (
          <SnippetCard snippet={post} />
        );

      return card;
    }
  });
};

export default function PostCardsPage({
  posts,
  pageIndex = 1,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [search, setSearch] = useState('');
  const { CategorySelector, selectedCategory, setSelectedCategory } =
    useCategorySelector();

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
    const searchPattern = new RegExp(search, 'ig');

    return title.match(searchPattern) || desc.match(searchPattern);
  });
  const paginations = paginateElements<MarkdownFile>(foundPosts, 5);
  const iconSize = '20';
  const categories = getAllCategories(posts);
  const showPaginates =
    search == '' && selectedCategory == PostCategoryGroups['All Posts'];

  return (
    <BasicPage>
      <div className="mx-auto flex flex-col w-full max-md:w-full w-2/3 xl:w-1/2 justify-center gap-4">
        <div className="flex flex-col justify-end gap-2">
          <div className="flex justify-end">
            <div className="w-1/3 max-sm:w-1/2">
              <CategorySelector categories={categories} />
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <MagnifyingGlassIcon
              width={iconSize}
              height={iconSize}
            />
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="border-gray-400 focus-visible:border-none focus-visible:ring-offset-0 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <PostCards
          posts={showPaginates ? paginations[pageIndex - 1] : foundPosts}
        />

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
