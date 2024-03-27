import { FooterSection } from '@/components/FooterSection';
import { NavbarSection } from '@/components/NavbarSection';

export const MainWrapper = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) => {
  return (
    <>
      <NavbarSection />
      {children}
      <div className="h-20"></div>
      <FooterSection visible={visible} />
    </>
  );
};
