import { Logo } from '@/components/Logo';
import { LinkItem, NavbarItems } from '@/components/NavbarItems';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { Dispatch, SetStateAction, useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { MenuButton } from './MenuButton';
import { usePathname } from 'next/navigation';

const NavItems = () => {
  const itemStyle =
    'px-4 py-4 hover:border-2 border-black dark:border-blue-200';
  const pathname = usePathname().split('/')[1];

  return (
    <div className="absolute z-10 flex w-full flex-col bg-background text-right">
      <LinkItem
        href="/"
        name="Posts"
        pathname={pathname}
        className={itemStyle}></LinkItem>
      <LinkItem
        href="/projects"
        name="Projects"
        pathname={pathname}
        className={itemStyle}></LinkItem>
      <LinkItem
        href="/about"
        name="About"
        pathname={pathname}
        className={itemStyle}></LinkItem>
      <div className="my-4"></div>
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
  const [navItemIsVisible, setNavItemsIsVisible] = useState(false);
  const menuButtonClickHandler = () => {
    setNavItemsIsVisible((visible) => !visible);
  };

  return (
    <>
      <div className="sticky top-0 z-10 mx-auto mb-4 flex h-16 flex-row items-center bg-background">
        <Logo />
        <div className="invisible mx-auto flex-row justify-center">
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
          <MenuButton clickHandler={menuButtonClickHandler} />
        </div>
      </div>
      <div className="relative">{navItemIsVisible && <NavItems />}</div>
    </>
  );
};
