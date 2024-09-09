import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

export const SearchBar = ({
  search,
  dispatch,
  className,
}: {
  search: string;
  dispatch: Dispatch<SetStateAction<string>>;
  className?: string;
}) => {
  const iconSize = '20';

  return (
    <div className={className}>
      <div className="flex flex-row items-center justify-center gap-2">
        <MagnifyingGlassIcon
          width={iconSize}
          height={iconSize}
        />
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(event) => dispatch(event.target.value)}
          className="border-gray-400 focus-visible:border-none focus-visible:ring-blue-500 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};
