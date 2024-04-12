import { MarkdownFile } from 'mdman';
import { MarkdownFileSortOrder } from '@/type';
import moment from 'moment/moment';

export const sortByCreatedTime = (
  a: MarkdownFile,
  b: MarkdownFile,
  order: MarkdownFileSortOrder,
): number => {
  if (order == MarkdownFileSortOrder.Ascend)
    return sortByCreatedTimeAscend(a, b);
  if (order == MarkdownFileSortOrder.Descend)
    return sortByCreatedTimeDescend(a, b);
  return 0;
};

const sortByCreatedTimeDescend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aTime = moment(a.metadata.createdTime);
  const bTime = moment(b.metadata.createdTime);

  if (aTime.isBefore(bTime)) return 1;
  if (aTime.isAfter(bTime)) return -1;
  return 0;
};

const sortByCreatedTimeAscend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aTime = moment(a.metadata.createdTime);
  const bTime = moment(b.metadata.createdTime);

  if (aTime.isBefore(bTime)) return -1;
  if (aTime.isAfter(bTime)) return 1;
  return 0;
};

export const sortByOrder = (
  a: MarkdownFile,
  b: MarkdownFile,
  order: MarkdownFileSortOrder,
): number => {
  if (order == MarkdownFileSortOrder.Ascend) return sortByOrderAscend(a, b);
  if (order == MarkdownFileSortOrder.Descend)
    return sortByCreatedTimeDescend(a, b);
  return 0;
};

const sortByOrderAscend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aOrder = a.metadata.order || 0;
  const bOrder = b.metadata.order || 0;

  if (aOrder < bOrder) return -1;
  if (aOrder > bOrder) return 1;
  return 0;
};

const sortByOrderDescend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aOrder = a.metadata.order || 0;
  const bOrder = b.metadata.order || 0;

  if (aOrder < bOrder) return 1;
  if (aOrder > bOrder) return -1;
  return 0;
};
