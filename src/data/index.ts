import { NavigationMenuProps, PostProps, PostCategoryType } from '@/type';

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

export const publicPosts: PostProps[] = [
  {
    title: 'first post',
    content: '...',
    category: PostCategoryType.React,
  },
  {
    title: 'second post',
    content: '...',
    category: PostCategoryType.General,
  },
];
