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

const mergeClassNames = (...classNames: string[]) =>
  classNames.filter(Boolean).join(' ');

export function DesktopNavbar() {
  const { isMobile } = useMobile();
  const linkClasses = mergeClassNames(navigationMenuTriggerStyle());

  const Navbar = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/posts"
              className={linkClasses}>
              Posts
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/snippets"
              className={linkClasses}>
              Snippets
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/projects"
              className={linkClasses}>
              Projects
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/contact"
              className={linkClasses}>
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  return isMobile ? <></> : <Navbar />;
}
