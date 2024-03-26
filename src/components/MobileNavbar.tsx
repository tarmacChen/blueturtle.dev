import { ReactNode } from "react"
import {
  HomeIcon,
  RocketIcon,
  FileIcon,
  PersonIcon,
} from "@radix-ui/react-icons"

export function MobileNavbar() {
  const containerClasses = "flex flex-row flex-1 px-0 justify-around "

  const NavbarItem = ({
    href,
    children,
  }: {
    href?: string
    children: ReactNode
  }) => {
    const containerClasses =
      "py-2 text-sm flex flex-col w-full justify-center items-center bg-white hover:bg-blue-100 hover:cursor-pointer"
    const itemClasses = "flex flex-col items-center"

    return (
      <div className={containerClasses}>
        <a href={href} className="w-full h-full">
          <div className={itemClasses}>{children}</div>
        </a>
      </div>
    )
  }

  const Navbar = () => (
    <div className={containerClasses}>
      <NavbarItem href="/">
        <HomeIcon />
        Home
      </NavbarItem>
      <NavbarItem href="/contact">
        <PersonIcon />
        Contact
      </NavbarItem>
      <NavbarItem href="/projects">
        <RocketIcon />
        Projects
      </NavbarItem>
      <NavbarItem href="/posts">
        <FileIcon />
        Posts
      </NavbarItem>
    </div>
  )

  return <Navbar />
}
