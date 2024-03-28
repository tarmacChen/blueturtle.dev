import { FooterSection } from '@/components/FooterSection';
import { NavbarSection } from '@/components/NavbarSection';

export const MainWrapper = ({
  children,
  showMobileNavbar,
}: {
  children: React.ReactNode;
  showMobileNavbar?: boolean;
}) => {
  return (
    <>
      <header className="w-full lg:w-2/3 mx-auto">
        <nav className="overflow-hidden">
          <NavbarSection />
        </nav>
        <div className="mt-20 px-8 overflow-scroll">{children}</div>
      </header>
      <FooterSection visible={showMobileNavbar} />
    </>
  );
};
