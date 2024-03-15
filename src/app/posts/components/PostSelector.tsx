import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PostDescription } from '@/type';

export const PostSelector = ({
  posts,
  valueChangeHandler: handler,
}: {
  posts: PostDescription[];
  valueChangeHandler: (value: string) => void;
}) => {
  return (
    <Select onValueChange={handler}>
      <SelectTrigger>
        <SelectValue placeholder="Select post"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {posts.map((post) => (
          <SelectItem
            value={post.title}
            key={post.id}>
            {post.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
