import { cloneElement } from 'react';

export const mergeClassNames = (...classNames: string[]) =>
  classNames.filter(Boolean).join(' ');

export const withListItemDecorator = (
  elements: React.ReactElement[],
  {
    oddItemClasses,
    evenItemClasses,
  }: { oddItemClasses: string; evenItemClasses: string },
) => {
  return elements.map((ele, index) => {
    const isEven = index % 2 != 0;

    return cloneElement(ele, {
      className: isEven ? evenItemClasses : oddItemClasses,
    });
  });
};

export function paginateElements<T>(elements: any[], pageSize: number) {
  const groups = [];
  const pages = elements.length / pageSize;
  let index = 0;

  while (index < pages) {
    groups.push(elements.slice(index * pageSize, pageSize + index * pageSize));
    index++;
  }
  return groups as T[][];
}
