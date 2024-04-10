import { MobileNavbar } from '@/components/MobileNavbar';
import { mergeClassNames } from '@/lib/helper';

export const FooterSection = () => {
  const footerClasses = mergeClassNames(
    'fixed w-screen bottom-0 justify-center'
  );

  return (
    <footer className={footerClasses}>
      <MobileNavbar />
    </footer>
  );
};
