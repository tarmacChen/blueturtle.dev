import { MobileNavbar } from '@/components/MobileNavbar';

export const FooterSection = ({ visible }: { visible?: boolean }) => {
  const navbarClasses = visible
    ? 'lg:invisible max-md:visible fixed w-screen bottom-0 justify-center'
    : 'hidden fixed w-screen bottom-0 justify-center';

  return (
    <div className={navbarClasses}>
      <MobileNavbar />
    </div>
  );
};
