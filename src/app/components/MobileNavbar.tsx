'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
  HomeIcon,
  RocketIcon,
  FileIcon,
  PersonIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';

const NavbarItem = ({ children }: { children: ReactNode }) => {
  const containerClasses =
    'py-2 flex flex-col w-full justify-center items-center hover:bg-blue-100 hover:cursor-pointer';
  const itemClasses = 'flex flex-col items-center ';

  return (
    <div className={containerClasses}>
      <div className={itemClasses}>{children}</div>
    </div>
  );
};

export function MobileNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const mobileDimension = 768;
  const iconSize = '18';

  function resizeHandler() {
    setIsMobile(window.innerWidth <= mobileDimension);
  }

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const Navbar = () => (
    <div className="flex flex-row flex-1 px-0 justify-around">
      <NavbarItem>
        <HomeIcon
          width={iconSize}
          height={iconSize}
        />
        Home
      </NavbarItem>
      <NavbarItem>
        <PersonIcon
          width={iconSize}
          height={iconSize}
        />
        Contact
      </NavbarItem>
      <NavbarItem>
        <RocketIcon
          width={iconSize}
          height={iconSize}
        />
        Projects
      </NavbarItem>
      <NavbarItem>
        <FileIcon
          width={iconSize}
          height={iconSize}
        />
        Posts
      </NavbarItem>
    </div>
  );

  return isMobile && <Navbar />;
}
