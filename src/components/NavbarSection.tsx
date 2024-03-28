import { Logo } from '@/components/Logo';
import { DesktopNavbar } from '@/components/DesktopNavbar';

export const NavbarSection = () => (
  <div className="fixed flex flex-row h-16 mx-8 w-full lg:w-2/3 items-center">
    <Logo />
    <div className="invisible md:visible flex justify-center mx-auto">
      <DesktopNavbar />
    </div>
  </div>
);
