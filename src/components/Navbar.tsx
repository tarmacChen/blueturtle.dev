import { Logo } from '@/components/Logo';
import { LinkItem, NavbarItems } from '@/components/NavbarItems';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';
import { useState } from 'react';
import { MenuButton } from './MenuButton';
import { usePathname } from 'next/navigation';

const NavItems = () => {
  const itemStyle = 'px-4 py-4 hover:bg-blue-100 dark:hover:bg-gray-800 ';
  const pathname = usePathname().split('/')[1];

  return (
    <div className="flex w-full flex-col bg-background text-right">
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
      <div className="my-2"></div>
    </div>
  );
};

export const Navbar = () => {
  const [navItemIsVisible, setNavItemsIsVisible] = useState(false);
  const menuButtonClickHandler = () => {
    setNavItemsIsVisible((visible) => !visible);
  };

  return (
    <div className="sticky top-0 z-10 mx-auto flex h-16 flex-row items-center bg-background">
      <Logo />
      <div className="flex w-full flex-row items-center justify-end gap-4">
        <div className="max-w-44"></div>
        <ToggleThemeButton />
        <MenuButton clickHandler={menuButtonClickHandler} />
      </div>
      <div className="absolute right-0 top-16 w-full">
        {navItemIsVisible && <NavItems />}
      </div>
    </div>
  );
};
