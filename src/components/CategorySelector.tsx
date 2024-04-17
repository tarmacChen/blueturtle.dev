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
}: {
  categories: string[];
  selectedCategory: string;
  dispatch: Dispatch<SetStateAction<string>>;
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
    dispatch(groups[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        dispatch(value);
        return value;
      }}
      value={selectedCategory}>
      <SelectTrigger className="border-gray-400">
        <SelectValue placeholder="Posts filter"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Group</SelectLabel>
          <SelectGroups />
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
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
