import { MarkdownFile } from 'mdman';

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

export interface MarkdownNode {
  [key: string]: any;
  type: string;
  value: string;
}

export interface MarkdownTypes {
  // markdown: { content?: string }
  md: MarkdownFile;
  codeStyle: { [key: string]: React.CSSProperties };
}

export type FetchMarkdownFileProps = {
  pageIndex: number;
  pageSize: number;
};

export enum MarkdownFileSortOrder {
  Ascend,
  Descend,
}

export type TagInfo = {
  label: string;
  value: string;
};
