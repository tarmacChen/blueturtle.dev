import { publicPosts } from '@/data';
import { PostCategoryType } from '@/type';

export default function PostsReact() {
  const posts = publicPosts.filter(
    (post) => post.category == PostCategoryType.React
  );

  return (
    <>
      {posts.map((post) => {
        return (
          <div>
            <h1>{post.title}</h1>
            {post.content}
          </div>
        );
      })}
    </>
  );
}
