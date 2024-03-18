export type NavigationMenuProps = {
  title: string;
  href: string;
  description: string;
  child?: NavigationMenuProps[];
  children?: React.ReactNode;
};

export type NavbarProps = {
  items: NavigationMenuProps[];
};

export enum PostCategoryType {
  General,
  React,
  Other,
}

export type PostDescription = {
  id: string | number;
  title: string;
  category: PostCategoryType;
  tags?: string[];
  content: string;
  description?: string;
  releaseTime?: Date;
};
