import { Logo } from '@/components/Logo';
import { DesktopNavbar } from '@/components/DesktopNavbar';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { Dispatch, SetStateAction } from 'react';
import { SearchBar } from '@/components/SearchBar';

export const Navbar = () => {
  return (
    <div className="sticky px-4 top-0 flex flex-row h-16 w-full items-center shadow-md bg-background dark:shadow-yellow-300 z-10">
      <Logo />
      <div className="invisible md:visible flex flex-row justify-center mx-auto">
        <DesktopNavbar />
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
  dispatch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="sticky px-4 top-0 flex flex-row h-16 w-full items-center shadow-md bg-background dark:shadow-yellow-300 z-10">
      <Logo />
      <div className="invisible md:visible flex flex-row justify-center mx-auto">
        <DesktopNavbar />
      </div>
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="max-w-44">
          <SearchBar
            search={search}
            dispatch={dispatch}
          />
        </div>
        <ToggleThemeButton />
      </div>
    </div>
  );
};
