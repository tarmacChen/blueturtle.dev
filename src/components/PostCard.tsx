import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarkdownFile } from 'mdman';
import moment, { now } from 'moment';
import Link from 'next/link';
import { SnippetCard } from '@/components/SnippetCard';

export const DraftBadge = () => (
  <Badge className="h-6 bg-gray-600 text-white hover:bg-gray-600">Draft</Badge>
);
export const PostBadge = () => (
  <Badge className="h-6 bg-blue-600 text-white hover:bg-blue-600">Post</Badge>
);

export const RedPoint = () => {
  return (
    <span className="relative right-0 top-0 flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
    </span>
  );
};

export const RedLabel = () => {
  return (
    <div className="absolute -left-4 top-0 flex -rotate-[35deg] animate-pulse rounded-lg bg-red-500 px-2 text-sm text-white">
      <label>New</label>
    </div>
  );
};

export const PostCard = ({ post }: { post: MarkdownFile }) => {
  const meta = post.metadata;
  const linkUrl = `/posts/${meta?.title}`;
  const createdTime = moment(meta.createdTime);
  const tags = meta.tags ? meta.tags.join(', ') : '';
  const category = meta.category || '';
  const today = moment(now());
  const isNewPost = today.diff(createdTime, 'months') <= 1;

  return (
    <Link href={linkUrl}>
      <Card className="relative border-gray-400 bg-gray-50 hover:border-2 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md dark:bg-gray-800 dark:hover:border-blue-500">
        {isNewPost && <RedLabel />}
        <CardHeader>
          <div className="flex flex-row justify-between gap-2">
            <CardTitle className="">{meta?.title}</CardTitle>
            {meta.draft ? <DraftBadge /> : <PostBadge />}
          </div>
          <CardDescription className="dark:text-gray-300">
            <div className="inline text-lg text-foreground">{category}</div>
            <div>{tags}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>{meta?.description}</div>
            <div className="flex flex-row justify-end">
              <div className="text-md">{createdTime.format('ll')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const PostCards = ({ posts }: { posts: MarkdownFile[] }) => {
  return posts?.map((post) => {
    {
      const card =
        post.metadata.type == 'post' ? (
          <PostCard
            post={post}
            key={post.filename}
          />
        ) : (
          <SnippetCard
            snippet={post}
            key={post.filename}
          />
        );

      return card;
    }
  });
};
