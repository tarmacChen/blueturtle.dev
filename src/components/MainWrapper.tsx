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
      <div className="mx-auto pl-4 pr-6 w-full overflow-hidden">
        <NavbarSection />
        <div className="mt-20 overflow-scroll">{children}</div>
        <div className="h-20"></div>
      </div>
      <FooterSection visible={showMobileNavbar} />
    </>
  );
};
