import { ReactNode } from 'react';
import {
  HomeIcon,
  RocketIcon,
  FileIcon,
  PersonIcon,
  ScissorsIcon,
} from '@radix-ui/react-icons';

export function MobileNavbar() {
  const containerClasses =
    'flex flex-row flex-1 px-0 justify-around bg-background text-foreground';

  const NavbarItem = ({
    href,
    children,
  }: {
    href?: string;
    children: ReactNode;
  }) => {
    const navbarItemContainerClasses =
      'py-2 text-sm flex flex-col w-full justify-center items-center hover:bg-primary hover:text-secondary hover:cursor-pointer';
    const navbarItemClasses = 'flex flex-col items-center';

    return (
      <div className={navbarItemContainerClasses}>
        <a
          href={href}
          className="w-full h-full">
          <div className={navbarItemClasses}>{children}</div>
        </a>
      </div>
    );
  };

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
      <NavbarItem href="/snippets">
        <ScissorsIcon />
        Snippets
      </NavbarItem>
      <NavbarItem href="/posts">
        <FileIcon />
        Posts
      </NavbarItem>
    </div>
  );

  return <Navbar />;
}
