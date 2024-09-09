import { CategorySelector } from '@/components/CategorySelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardStackIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { PostCards } from '@/components/PostCard';
import { PostList } from '@/components/PostItem';
import { Dispatch, SetStateAction } from 'react';
import { MarkdownFile } from 'mdman';
import { useDevice } from '@/hooks/useDevice';
import { SearchBar } from './SearchBar';

export const PostSelector = ({
  categories,
  selectedCategory,
  dispatch,
  posts,
  defaultCategory,
  search,
  setSearch,
}: {
  categories: string[];
  selectedCategory: string;
  dispatch: Dispatch<SetStateAction<string>>;
  posts: MarkdownFile[];
  defaultCategory: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const { isMobile } = useDevice();

  const PostViewSelector = () => {
    return (
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
    );
  };

  return (
    <Tabs defaultValue="card">
      <div className="my-2 flex w-full justify-end">
        <SearchBar
          search={search}
          dispatch={setSearch}
          className="w-1/4 max-sm:w-full"
        />
      </div>
      <div className="flex justify-between">
        <PostViewSelector />
        <div className="mb-1 w-1/3 max-sm:w-1/2">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            dispatch={dispatch}
            defaultValue={defaultCategory}
          />
        </div>
      </div>
      <TabsContent value="card">
        <div className="flex flex-col gap-4">
          <PostCards posts={posts} />
        </div>
      </TabsContent>
      <TabsContent value="compact">
        <PostList posts={posts} />
      </TabsContent>
    </Tabs>
  );
};
