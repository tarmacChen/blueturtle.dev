import { PostDescription, PostCategoryType } from '@/type';

export const publicPosts: PostDescription[] = [
  {
    id: 1,
    title: 'first post',
    content: `# title

## heading 1

### heading 2

- item1

~~delete~~`,

    category: PostCategoryType.React,
    description: '...',
  },
  {
    id: 2,
    title: 'second post',
    content: `
    # heading 1

    `,
    category: PostCategoryType.General,
  },
  {
    id: 3,
    title: 'third post',
    content: `# React Tutorial

> ...
\`\`\`js
console.log(123)
\`\`\``,
    category: PostCategoryType.React,
  },
];
