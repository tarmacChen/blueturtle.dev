import { cloneElement } from 'react';

export const mergeClassNames = (...classNames: string[]) =>
  classNames.filter(Boolean).join(' ');

export const withListItemDecorator = (
  elements: React.ReactElement[],
  {
    oddItemClasses,
    evenItemClasses,
  }: { oddItemClasses: string; evenItemClasses: string }
) => {
  return elements.map((ele, index) => {
    const isEven = index % 2 != 0;

    return cloneElement(ele, {
      className: isEven ? evenItemClasses : oddItemClasses,
    });
  });
};
