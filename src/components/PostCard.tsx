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
  <Badge className="bg-gray-600 h-6 text-white hover:bg-gray-600">Draft</Badge>
);
export const PostBadge = () => (
  <Badge className="bg-blue-600 h-6 text-white hover:bg-blue-600">Post</Badge>
);

export const RedPoint = () => {
  return (
    <span className="flex relative w-3 h-3 top-0 right-0">
      <span className="absolute animate-ping inline-flex bg-red-500 w-full h-full rounded-full opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
    </span>
  );
};

export const RedLabel = () => {
  return (
    <div className="animate-pulse px-2 flex absolute top-0 -left-4 -rotate-[35deg] bg-red-500 text-white rounded-lg text-sm">
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
      <Card className="relative bg-gray-50 border-gray-400 dark:bg-gray-800 hover:bg-blue-50 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 hover:border-2">
        {isNewPost && <RedLabel />}
        <CardHeader>
          <div className="flex flex-row justify-between gap-2">
            <CardTitle className="">{meta?.title}</CardTitle>
            {meta.draft ? <DraftBadge /> : <PostBadge />}
          </div>
          <CardDescription className="dark:text-gray-300">
            <div className="text-foreground text-lg inline">{category}</div>
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
