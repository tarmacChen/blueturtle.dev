'use client';

import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb';
import { NavbarProps } from '@/type';
import { BreadcrumbProvider } from '@/components/shadcn-extended';

export function NavbarFooter({ items }: NavbarProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <BreadcrumbProvider
              item={item}
              itemIsLast={index == items.length - 1}
              key={item.href}
            />
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
