import { Logo } from '@/components/Logo';
import { DesktopNavbar } from '@/components/DesktopNavbar';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';

export const NavbarSection = () => (
  <div className="sticky top-0 flex flex-row h-16 w-full items-center shadow-md bg-background dark:shadow-yellow-300">
    <Logo className="ml-8" />
    <div className="invisible md:visible flex flex-row justify-center mx-auto">
      <DesktopNavbar />
    </div>
    <div className="m-4">
      <ToggleThemeButton />
    </div>
  </div>
);
