import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { PostCategoryGroups } from '@/type';

export const useCategorySelector = () => {
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

  const [selectedCategory, setSelectedCategory] = useState<string>(groups[0]);

  const CategorySelector = ({ categories }: { categories: string[] }) => (
    <Select
      onValueChange={(value) => {
        setSelectedCategory(value);
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

  return { CategorySelector, selectedCategory };
};
