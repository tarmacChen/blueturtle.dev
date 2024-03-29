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
      <header className="w-full mx-auto">
        <NavbarSection />
        <div className="my-4 px-8 ">{children}</div>
      </header>
      <FooterSection visible={showMobileNavbar} />
    </>
  );
};
