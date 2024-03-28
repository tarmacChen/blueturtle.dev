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
      <div className="mx-auto px-8 overflow-hidden">
        <NavbarSection />
      </div>
      <div className="mt-20 px-8 overflow-scroll">{children}</div>
      <FooterSection visible={showMobileNavbar} />
    </>
  );
};
