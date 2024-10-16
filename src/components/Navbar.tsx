import { Logo } from "@/components/Logo";
import { ToggleThemeButton } from "@/components/ToggleThemeButton";
import { AnchorHTMLAttributes } from "react";
import { MobileNavMenu } from "./MobileNavMenu";
import Link from "next/link";
import clsx from "clsx";

export const Navbar = () => {
  return (
    <div className="mx-auto flex h-16 flex-row items-center bg-background">
      <Logo />
      <div className="flex w-full flex-row items-center justify-end gap-4">
        <ToggleThemeButton />
        <MobileNavMenu />
      </div>
    </div>
  );
};
