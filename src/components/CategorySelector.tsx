import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PostCategoryGroups } from '@/type';
import { Dispatch, SetStateAction, useEffect } from 'react';

export const CategorySelector = ({
  categories,
  selectedCategory,
  dispatch,
  defaultValue,
}: {
  categories: string[];
  selectedCategory: string;
  dispatch: Dispatch<SetStateAction<string>>;
  defaultValue: string;
}) => {
  const groups = Object.values(PostCategoryGroups);
  const SelectGroups = () => {
    return groups.map((group, index) => (
      <SelectItem
        value={group}
        key={index}>
        {group}
      </SelectItem>
    ));
  };

  useEffect(() => {
    dispatch(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        dispatch(value);
        return value;
      }}
      value={selectedCategory}>
      <SelectTrigger className="border-gray-400 focus:border-none focus:ring-offset-0 focus:ring-blue-500">
        <SelectValue placeholder="Posts filter"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Show All">Show All</SelectItem>
        <SelectGroup>
          <SelectLabel>Groups</SelectLabel>
          <SelectGroups />
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => {
            return (
              <SelectItem
                value={category}
                key={category}>
                {category}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
