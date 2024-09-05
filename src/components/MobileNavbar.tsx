import { ReactNode } from 'react';
import {
  HomeIcon,
  RocketIcon,
  FileIcon,
  PersonIcon,
  ScissorsIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

export function MobileNavbar() {
  const containerClasses =
    'flex flex-row bg-background text-foreground';

  const NavbarItem = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => {
    const navbarItemContainerClasses =
      'py-2 text-sm flex flex-col w-full justify-center items-center hover:bg-primary hover:text-secondary hover:cursor-pointer ';
    const navbarItemClasses = 'flex flex-col items-center';

    return (
      <Link
        href={href}
        className="w-full">
        <div className={navbarItemContainerClasses}>
          <div className={navbarItemClasses}>{children}</div>
        </div>
      </Link>
    );
  };

  const Navbar = () => (
    <nav className={containerClasses}>
      <NavbarItem href="/">
        <HomeIcon />
        Home
      </NavbarItem>
      <NavbarItem href="/projects">
        <RocketIcon />
        Projects
      </NavbarItem>
      <NavbarItem href="/about">
        <PersonIcon />
        About
      </NavbarItem>
    </nav>
  );

  return <Navbar />;
}
