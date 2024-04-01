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
  const items = groups.map((group, index) => {
    const pageIndex = index + 1;
    const url = `${baseUrl}/${pageIndex}`;

    return (
      <PaginationItem key={pageIndex}>
        <Link
          href={pageIndex == currentIndex ? '/' : url}
          className={pageIndex == currentIndex ? 'font-bold' : ''}>
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

  const NextItem = () => (
    <PaginationItem>
      <PaginationNext href="#"></PaginationNext>
    </PaginationItem>
  );

  return (
    <Pagination>
      <PaginationContent>
        {currentIndex - 1 > 1 && <PreviousItem />}
        {items}
        {currentIndex + 1 <= groups.length && <NextItem />}
      </PaginationContent>
    </Pagination>
  );
}
