export type NavigationMenuProps = {
  title: string
  href: string
  description: string
  child?: NavigationMenuProps[]
  children?: React.ReactNode
}

export type NavbarProps = {
  items: NavigationMenuProps[]
}

export enum PostCategoryType {
  General,
  React,
  Other,
}

export type PostDescription = {
  id: string | number
  title: string
  category: PostCategoryType
  tags?: string[]
  content: string
  description?: string
  releaseTime?: Date
}

export type MarkdownMetadata = {
  title?: string
  publicDate?: string
  description?: string
  author?: string
  tags?: string[]
  category?: string
  weight?: number
  draft?: boolean
  keywords?: string[]
}

export type MarkdownFile = {
  filename: string
  content?: string
  data?: MarkdownMetadata & { [key: string]: any }
}

export interface MarkdownNode {
  [key: string]: any
  type: string
  value: string
}

export interface MarkdownTypes {
  markdown: { content?: string }
  style: { [key: string]: React.CSSProperties }
}
