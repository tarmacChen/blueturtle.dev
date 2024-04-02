import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
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
    const LinkItem = () => (
      <div className="flex flex-row gap-2">
        <div>{'<'}</div>
        <div>Previous</div>
      </div>
    );

    return (
      <PaginationItem>
        <Link href={url}>
          <LinkItem />
        </Link>
      </PaginationItem>
    );
  };

  const NextItem = () => {
    const url = `${baseUrl}/${currentIndex + 1}`;
    const LinkItem = () => (
      <div className="flex flex-row gap-2">
        <div>Next</div>
        <div>{'>'}</div>
      </div>
    );

    return (
      <PaginationItem>
        <Link href={url}>
          <LinkItem />
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
        {items}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {hasNextPage && <NextItem />}
      </PaginationContent>
    </Pagination>
  );
}
