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

const mergeClassNames = (...classNames: string[]) =>
  classNames.filter(Boolean).join(' ');

export function DesktopNavbar() {
  const { isMobile } = useMobile();
  const linkClasses = mergeClassNames(
    navigationMenuTriggerStyle(),
    'bg-white rounded-none border-0'
  );

  const Navbar = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/posts"
              legacyBehavior
              passHref>
              <NavigationMenuLink className={linkClasses}>
                Posts
              </NavigationMenuLink>
            </Link>
            <Link
              href="/snippets"
              legacyBehavior
              passHref>
              <NavigationMenuLink className={linkClasses}>
                Snippets
              </NavigationMenuLink>
            </Link>
            <Link
              href="/projects"
              legacyBehavior
              passHref>
              <NavigationMenuLink className={linkClasses}>
                Projects
              </NavigationMenuLink>
            </Link>
            <Link
              href="/contact"
              legacyBehavior
              passHref>
              <NavigationMenuLink className={linkClasses}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  return isMobile ? <></> : <Navbar />;
}
