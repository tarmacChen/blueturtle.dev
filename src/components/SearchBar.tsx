import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

export const SearchBar = ({
  search,
  dispatch,
}: {
  search: string;
  dispatch: Dispatch<SetStateAction<string>>;
}) => {
  const iconSize = '20';

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <MagnifyingGlassIcon
        width={iconSize}
        height={iconSize}
      />
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event) => dispatch(event.target.value)}
        className="border-gray-400 focus-visible:border-none focus-visible:ring-offset-0 focus-visible:ring-blue-500"
      />
    </div>
  );
};
