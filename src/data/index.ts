import { NavigationMenuProps, PostDescription, PostCategoryType } from '@/type';

const postsMenu: NavigationMenuProps[] = [
  { title: 'All', href: '/posts', description: 'get all posts' },
  {
    title: 'React',
    href: '/posts/react',
    description: 'get posts about React',
  },
];

export const navbarItems: NavigationMenuProps[] = [
  {
    title: 'Posts',
    href: '/posts',
    description: 'posts',
    child: postsMenu,
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'contact',
  },
];

export const navbarFooterItems: NavigationMenuProps[] = [
  {
    title: 'Home',
    href: '/',
    description: 'homepage',
  },
  ...navbarItems,
];

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
