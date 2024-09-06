import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React from 'react';
import { useDevice } from '@/hooks/useDevice';
import Link from 'next/link';
import { mergeClassNames } from '@/lib/helper';
import { usePathname } from 'next/navigation';

export const LinkItem = ({
  href,
  name,
  pathname,
  className,
}: {
  href: string;
  name: string;
  pathname: string;
  className?: string;
}) => {
  const isActive = href.split('/')[1] == pathname;
  // const linkClasses = mergeClassNames(
  //   'mx-2 rounded-none',
  //   isActive ? 'border-b-2 ' : '',
  //   'hover:bg-gray-100 dark:hover:bg-gray-800 ',
  // );

  return (
    <Link
      href={href}
      className={className}>
      {name}
      {/* <NavigationMenuLink className={linkClasses}>{name}</NavigationMenuLink> */}
    </Link>
  );
};

export function NavbarItems() {
  const pathname = usePathname().split('/')[1];
  const { isMobile } = useDevice();

  const Navbar = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <LinkItem
              href="/"
              name="Posts"
              pathname={pathname}
            />
            <LinkItem
              href="/projects"
              name="Projects"
              pathname={pathname}
            />
            <LinkItem
              href="/about"
              name="About"
              pathname={pathname}
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  return isMobile ? <></> : <Navbar />;
}
