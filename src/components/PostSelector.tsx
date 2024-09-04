import { CategorySelector } from '@/components/CategorySelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardStackIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { PostCards } from '@/components/PostCard';
import { PostList } from '@/components/PostItem';
import { Dispatch, SetStateAction } from 'react';
import { MarkdownFile } from 'mdman';
import { useDevice } from '@/hooks/useDevice';

export const PostSelector = ({
  categories,
  selectedCategory,
  dispatch,
  posts,
  defaultCategory,
}: {
  categories: string[];
  selectedCategory: string;
  dispatch: Dispatch<SetStateAction<string>>;
  posts: MarkdownFile[];
  defaultCategory: string;
}) => {
  const { isMobile } = useDevice();

  return (
    <Tabs defaultValue="card">
      <div className="flex justify-between">
        <div className="w-1/3 max-sm:w-1/2 mb-1">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            dispatch={dispatch}
            defaultValue={defaultCategory}
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
          <PostCards posts={posts} />
        </div>
      </TabsContent>
      <TabsContent value="compact">
        <PostList posts={posts} />
      </TabsContent>
    </Tabs>
  );
};
