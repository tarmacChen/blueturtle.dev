export type NavigationMenuProps = {
  title: string;
  href: string;
  description: string;
  child?: NavigationMenuProps[];
};

export type NavbarProps = {
  items: NavigationMenuProps[];
};

export enum PostCategoryType {
  General,
  React,
  Other,
}

export type PostProps = {
  title: string;
  category: PostCategoryType;
  tags?: string[];
  content: string;
};
