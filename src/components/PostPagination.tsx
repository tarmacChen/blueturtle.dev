import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import Link from 'next/link';
import { MarkdownFile } from 'mdman';
import { paginateElements } from '@/lib/helper';

export function PostPagination({
  posts,
  baseUrl,
  currentIndex,
}: {
  posts: MarkdownFile[];
  baseUrl: string;
  currentIndex: number;
}) {
  const group = paginateElements<MarkdownFile>(posts, 5);
  const items = group.map((group, index) => {
    const pageIndex = index + 1;
    const currentPageIsActive = pageIndex == currentIndex;
    const activeUrl = currentPageIsActive ? '/' : `${baseUrl}/${pageIndex}`;

    return (
      <PaginationItem
        key={pageIndex}
        className={
          currentPageIsActive
            ? 'flex flex-row items-center justify-center rounded-md border-2 px-4 py-2'
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
  const hasNextPage = currentIndex + 1 <= group.length;

  return (
    <Pagination>
      <PaginationContent className="text-md flex flex-row gap-4">
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
