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
      <div className="w-full lg:w-2/3 mx-auto">
        <div className="overflow-hidden">
          <NavbarSection />
        </div>
        <div className="mt-20 px-8 overflow-scroll">{children}</div>
      </div>
      <FooterSection visible={showMobileNavbar} />
    </>
  );
};
