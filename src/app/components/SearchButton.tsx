import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const SearchButton = () => {
  return (
    <div className="flex flex-row mr-4 w-48 rounded-lg gap-2 items-center">
      <MagnifyingGlassIcon
        width="20"
        height="20"
      />
      <Input
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};
