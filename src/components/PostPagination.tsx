import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Link from 'next/link';
import { MarkdownFile } from 'mdman';
import { mergeClassNames } from '@/lib/helper';

export function PostPagination({
  groups,
  baseUrl,
  currentIndex,
}: {
  groups: MarkdownFile[][];
  baseUrl: string;
  currentIndex: number;
}) {
  const items = groups.map((group, index) => {
    const pageIndex = index + 1;
    const url = `${baseUrl}/${pageIndex}`;
    const isActive = pageIndex == currentIndex;

    return (
      <PaginationItem
        key={pageIndex}
        className={
          isActive
            ? 'flex flex-row px-4 py-2 border-2 rounded-md justify-center items-center'
            : ''
        }>
        <Link
          href={isActive ? '/' : url}
          className={isActive ? 'text-center' : ''}>
          {pageIndex}
        </Link>
      </PaginationItem>
    );
  });

  const PreviousItem = () => (
    <PaginationItem>
      <PaginationPrevious href="#"></PaginationPrevious>
    </PaginationItem>
  );

  const NextItem = () => {
    const nextUrl = `${baseUrl}/${currentIndex + 1}`;
    return (
      <PaginationItem>
        <PaginationNext href={nextUrl}></PaginationNext>
      </PaginationItem>
    );
  };

  const hasPreviousPage = currentIndex - 1 > 1;
  const hasNextPage = currentIndex + 1 <= groups.length;

  return (
    <Pagination>
      <PaginationContent className="flex flex-row gap-4 text-md">
        {hasPreviousPage && <PreviousItem />}
        {items}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {hasNextPage && <NextItem />}
      </PaginationContent>
    </Pagination>
  );
}
