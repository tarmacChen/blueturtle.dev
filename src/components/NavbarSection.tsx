import { Logo } from '@/components/Logo';
import { DesktopNavbar } from '@/components/DesktopNavbar';
import { SearchButton } from '@/components/SearchButton';

export const NavbarSection = () => (
  <div className="flex flex-row w-full align-middle h-20 items-center">
    <Logo className="ml-4" />
    <div className="invisible md:visible w-full flex justify-center">
      <DesktopNavbar />
    </div>
    <div className="flex items-center w-96">
      <SearchButton className="mr-4 " />
    </div>
  </div>
);
