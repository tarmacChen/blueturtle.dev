import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, useState } from "react";

export const MobileNavMenu = () => {
  const iconSize = 24;
  const [navItemIsVisible, setNavItemsIsVisible] = useState(false);
  const clickHandler = () => {
    setNavItemsIsVisible((visible) => !visible);
  };

  const MenuItem = ({
    href,
    children,
    className,
  }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
      <Link
        href={href || ""}
        className={clsx("my-4 px-4 underline hover:text-blue-600", className)}>
        {children}
      </Link>
    );
  };

  const NavMenu = () => {
    return (
      <div className="flex flex-col rounded-xl border-[1px] border-foreground bg-background py-8">
        <MenuItem href="/">Posts</MenuItem>
        <MenuItem href="/projects">Projects</MenuItem>
        <MenuItem href="/about">About</MenuItem>
      </div>
    );
  };

  return (
    <div className="cursor-pointer">
      <HamburgerMenuIcon
        width={iconSize}
        height={iconSize}
        onClick={clickHandler}
      />
      <div className="absolute">
        <div className="relative right-24 top-4 z-10 w-32">
          {navItemIsVisible && <NavMenu />}
        </div>
      </div>
    </div>
  );
};
