'use client';

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import React from 'react';
import { NestedNavigationMenu } from '@/components/shadcn-extended';
import { NavbarProps } from '@/type';

export function Navbar({ items }: NavbarProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) =>
          item.child ? (
            <NestedNavigationMenu
              {...item}
              key={item.href}
            />
          ) : (
            <NavigationMenuLink
              title={item.title}
              href={item.href}
              className="text-sm font-medium"
              key={item.href}>
              {item.title}
            </NavigationMenuLink>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
