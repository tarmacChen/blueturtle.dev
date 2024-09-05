import { Logo } from '@/components/Logo';
import { NavbarItems } from '@/components/NavbarItems';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { Dispatch, SetStateAction } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { HamburgerMenu } from './HamburgerMenu';

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 flex h-16 w-full flex-row items-center bg-background px-4 shadow-md dark:shadow-yellow-300">
      <Logo />
      <div className="invisible mx-auto flex flex-row justify-center md:visible">
        <NavbarItems />
      </div>
      <ToggleThemeButton />
    </div>
  );
};

export const NavbarWithSearchBar = ({
  search,
  dispatch,
}: {
  search: string;
  dispatch?: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="sticky top-0 z-10 mx-auto mb-4 flex h-16 flex-row items-center bg-background">
      <Logo />
      <div className="mx-auto flex flex-row justify-center">
        <NavbarItems />
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="max-w-44">
          <SearchBar
            search={search}
            dispatch={dispatch}
          />
        </div>
        <ToggleThemeButton />
        <HamburgerMenu />
      </div>
    </div>
  );
};
