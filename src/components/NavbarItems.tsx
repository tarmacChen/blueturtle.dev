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

export function NavbarItems() {
  const pathname = usePathname().split('/')[1];
  const { isMobile } = useDevice();

  const LinkItem = ({ href, name }: { href: string; name: string }) => {
    const isActive = href.split('/')[1] == pathname;
    const linkClasses = mergeClassNames(
      navigationMenuTriggerStyle(),
      'mx-2 rounded-none',
      isActive ? 'border-b-2 border-b-blue-600' : '',
      'hover:bg-gray-100 dark:hover:bg-gray-800 ',
    );

    return (
      <Link
        href={href}
        legacyBehavior
        passHref>
        <NavigationMenuLink className={linkClasses}>{name}</NavigationMenuLink>
      </Link>
    );
  };

  const Navbar = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <LinkItem
              href="/"
              name="Posts"
            />
            <LinkItem
              href="/projects"
              name="Projects"
            />
            <LinkItem
              href="/about"
              name="About"
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  return isMobile ? <></> : <Navbar />;
}
