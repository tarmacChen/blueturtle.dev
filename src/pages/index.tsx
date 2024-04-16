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
import { getAllPostTags } from '@/lib/helper';
import { TagInfo } from '@/type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
          <SnippetCard mdFile={post} />
        );

      return card;
    }
  });
};

export default function PostCardsPage({
  posts,
  pageIndex = 1,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const defaultTagName = 'All Posts';
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState(defaultTagName);
  const filteredPosts =
    selectedTag == defaultTagName
      ? posts
      : posts.filter((post) => {
          const tags = post.metadata.tags || [];
          return tags.includes(selectedTag);
        });
  const foundPosts = filteredPosts.filter((post) => {
    const title = post.metadata.title || '';
    const desc = post.metadata.description || '';
    const searchPattern = new RegExp(search, 'ig');

    return title.match(searchPattern) || desc.match(searchPattern);
  });
  const paginations = paginateElements<MarkdownFile>(foundPosts, 5);
  const iconSize = '20';
  const tags = getAllPostTags(posts);
  const showPaginates = search == '' && selectedTag == defaultTagName;

  const TagSelector = ({ tags }: { tags: TagInfo[] }) => {
    return (
      <Select
        onValueChange={(event) => {
          setSelectedTag(event);
          return event;
        }}
        value={selectedTag}>
        <SelectTrigger className="border-gray-400">
          <SelectValue placeholder="tags filter"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={defaultTagName}>{defaultTagName}</SelectItem>
            {tags.map((tag, index) => {
              return (
                <SelectItem
                  value={tag.value}
                  key={tag.label}>
                  {tag.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  return (
    <BasicPage>
      <div className="mx-auto flex flex-col w-full max-md:w-full w-2/3 xl:w-1/2 justify-center gap-4">
        <div className="flex flex-col justify-end gap-2">
          <div className="flex justify-end">
            <div className="w-1/4 max-md:w-1/3">
              <TagSelector tags={tags} />
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
