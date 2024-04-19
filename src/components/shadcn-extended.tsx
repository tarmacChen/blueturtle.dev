import { cn } from '@/lib/utils';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import React from 'react';
import { NavigationMenuProps } from '@/type';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

export const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export const NestedNavigationMenu = (props: NavigationMenuProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{props.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-64 gap-2 p-4 md:w-80 md:grid-cols-2 lg:w-96">
          {props.child?.map((subMenu) => (
            <ListItem
              key={subMenu.href}
              href={subMenu.href}
              title={subMenu.title}>
              {subMenu.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export const DropdownMenuProvider = (item: NavigationMenuProps) => {
  const pathname = usePathname();
  const rootPathname = pathname.split('/')[1];
  const rootIsActivated = item.href.split('/')[1] == rootPathname;
  const basicTriggerClasses = 'flex items-center gap-1';
  const activatedTriggerClasses = [basicTriggerClasses, 'text-black'].join(' ');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          rootIsActivated ? activatedTriggerClasses : basicTriggerClasses
        }>
        {item.title}
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {item.child?.map((subItem) => {
          const basicMenuClasses = 'hover:cursor-pointer ';

          return (
            <DropdownMenuItem
              key={subItem.href}
              className={basicMenuClasses}
              asChild>
              <a href={subItem.href}>{subItem.title}</a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BreadcrumbProvider = ({
  item,
  itemIsLast: isLastItem,
}: {
  item: NavigationMenuProps;
  itemIsLast?: boolean;
}) => {
  const currentPath = usePathname();
  const isActivated = item.href == currentPath;

  const BreadcrumbMenu = () => {
    if (item.child) return <DropdownMenuProvider {...item} />;
    if (isActivated) return <BreadcrumbPage>{item.title}</BreadcrumbPage>;
    return <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>;
  };

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbMenu />
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbSeparator />}
    </>
  );
};
