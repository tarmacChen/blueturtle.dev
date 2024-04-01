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
}: {
  groups: MarkdownFile[][];
  baseUrl: string;
}) {
  const items = groups.map((group, index) => {
    const pageIndex = index + 1;
    const url = `${baseUrl}/${pageIndex}`;

    return (
      <PaginationItem key={pageIndex}>
        <Link href={url}>{pageIndex}</Link>
      </PaginationItem>
    );
  });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#"></PaginationPrevious>
        </PaginationItem>
        {items}
        <PaginationItem>
          <PaginationNext href="#"></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
