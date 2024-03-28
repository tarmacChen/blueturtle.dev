import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React from 'react';
import { useMobile } from '@/hooks/useMobile';
import Link from 'next/link';
import { mergeClassNames } from '@/lib/helper';
import { usePathname } from 'next/navigation';

export function DesktopNavbar() {
  const pathname = usePathname();
  const { isMobile } = useMobile();

  const LinkItem = ({ href, name }: { href: string; name: string }) => {
    const isActive = href == pathname;
    const linkClasses = mergeClassNames(
      navigationMenuTriggerStyle(),
      'bg-white rounded-md border-0 mx-2 ',
      isActive ? 'border-primary border-b-2' : ''
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
              href="/posts"
              name="Posts"
            />
            <LinkItem
              href="/snippets"
              name="Snippets"
            />
            <LinkItem
              href="/projects"
              name="Projects"
            />
            <LinkItem
              href="/contact"
              name="Contact"
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  return isMobile ? <></> : <Navbar />;
}
