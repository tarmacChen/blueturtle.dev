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

export interface MarkdownNode {
  [key: string]: any
  type: string
  value: string
}

export interface MarkdownTypes {
  markdown: { content?: string }
  codeStyle: { [key: string]: React.CSSProperties }
}
