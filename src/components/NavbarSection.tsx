import { Logo } from '@/components/Logo';
import { DesktopNavbar } from '@/components/DesktopNavbar';

export const NavbarSection = () => (
  <div className="fixed flex flex-row h-16 items-center bg-white w-full">
    <Logo />
    <div className="invisible md:visible w-full flex justify-center">
      <DesktopNavbar />
    </div>
  </div>
);
