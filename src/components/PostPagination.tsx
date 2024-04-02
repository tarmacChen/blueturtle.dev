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

export function PostPagination({
  groups,
  baseUrl,
  currentIndex,
}: {
  groups: MarkdownFile[][];
  baseUrl: string;
  currentIndex: number;
}) {
  const paginationItems = groups.map((group, index) => {
    const pageIndex = index + 1;
    const currentPageIsActive = pageIndex == currentIndex;
    const activeUrl = currentPageIsActive ? '/' : `${baseUrl}/${pageIndex}`;

    return (
      <PaginationItem
        key={pageIndex}
        className={
          currentPageIsActive
            ? 'flex flex-row px-4 py-2 border-2 rounded-md justify-center items-center'
            : ''
        }>
        {currentPageIsActive ? (
          pageIndex
        ) : (
          <Link
            href={activeUrl}
            className="text-center">
            {pageIndex}
          </Link>
        )}
      </PaginationItem>
    );
  });

  const PreviousItem = () => {
    const url = `${baseUrl}/${currentIndex - 1}`;

    return (
      <PaginationItem>
        <Link href={url}>
          <PaginationPrevious />
        </Link>
      </PaginationItem>
    );
  };

  const NextItem = () => {
    const url = `${baseUrl}/${currentIndex + 1}`;

    return (
      <PaginationItem>
        <Link href={url}>
          <PaginationNext />
        </Link>
      </PaginationItem>
    );
  };

  const hasPreviousPage = currentIndex - 1 >= 1;
  const hasNextPage = currentIndex + 1 <= groups.length;

  return (
    <Pagination>
      <PaginationContent className="flex flex-row gap-4 text-md">
        {hasPreviousPage && <PreviousItem />}
        {paginationItems}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {hasNextPage && <NextItem />}
      </PaginationContent>
    </Pagination>
  );
}
