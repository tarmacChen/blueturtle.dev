import { MobileNavbar } from '@/components/MobileNavbar';

export const FooterSection = ({ visible }: { visible?: boolean }) => {
  const navbarClasses = visible
    ? 'md:invisible max-lg:visible fixed w-screen bottom-0 justify-center'
    : 'hidden fixed w-screen bottom-0 justify-center';

  return (
    <div className={navbarClasses}>
      <MobileNavbar />
    </div>
  );
};
