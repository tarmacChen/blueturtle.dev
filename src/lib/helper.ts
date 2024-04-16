import { cloneElement } from 'react';
import { MarkdownFile } from 'mdman';
import { TagInfo } from '@/type';
import { is } from 'unist-util-is';

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

export const getAllPostTags = (posts: MarkdownFile[]) => {
  const tagsCollection: TagInfo[] = [];

  posts.map((post) => {
    const tags = post.metadata.tags || [''];

    tags.map((tag) => {
      const tagValue = tag.charAt(0).toUpperCase() + tag.slice(1);
      const tagLabel = tag;

      if (
        tagsCollection.find((findTag) => findTag.label == tagLabel) == undefined
      ) {
        tagsCollection.push({ value: tagLabel, label: tagLabel });
      }
    });
  });

  return tagsCollection;
};
