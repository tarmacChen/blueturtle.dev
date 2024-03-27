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
      <NavbarSection />
      {children}
      <div className="h-20"></div>
      <FooterSection visible={showMobileNavbar} />
    </>
  );
};
