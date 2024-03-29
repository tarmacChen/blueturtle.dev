import { Logo } from '@/components/Logo';
import { DesktopNavbar } from '@/components/DesktopNavbar';

export const NavbarSection = () => (
  <div className="sticky top-0 flex flex-row h-16 w-full items-center bg-white shadow-md">
    <Logo className="ml-8" />
    <div className="invisible md:visible flex justify-center mx-auto">
      <DesktopNavbar />
    </div>
  </div>
);
