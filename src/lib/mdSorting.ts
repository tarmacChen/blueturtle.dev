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

export const sortByWeight = (
  a: MarkdownFile,
  b: MarkdownFile,
  order: MarkdownFileSortOrder,
): number => {
  if (order == MarkdownFileSortOrder.Ascend) return sortByWeightAscend(a, b);
  if (order == MarkdownFileSortOrder.Descend)
    return sortByCreatedTimeDescend(a, b);
  return 0;
};

const sortByWeightAscend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aOrder = a.metadata.weight || 0;
  const bOrder = b.metadata.weight || 0;

  if (aOrder < bOrder) return -1;
  if (aOrder > bOrder) return 1;
  return 0;
};

const sortByWeightDescend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aOrder = a.metadata.weight || 0;
  const bOrder = b.metadata.weight || 0;

  if (aOrder < bOrder) return 1;
  if (aOrder > bOrder) return -1;
  return 0;
};
