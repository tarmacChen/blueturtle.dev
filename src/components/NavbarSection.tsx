import { Logo } from '@/components/Logo';
import { DesktopNavbar } from '@/components/DesktopNavbar';

export const NavbarSection = () => (
  <div className="flex flex-row my-4">
    <Logo />
    <div className="invisible md:visible w-full flex justify-end">
      <DesktopNavbar />
    </div>
  </div>
);
