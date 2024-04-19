import { MobileNavbar } from '@/components/MobileNavbar';
import { mergeClassNames } from '@/lib/helper';

export const FooterSection = () => {
  const footerClasses = mergeClassNames(
    'fixed w-screen bottom-0 justify-center border-t-[1px] dark:border-t-white z-10',
  );

  return (
    <footer className={footerClasses}>
      <MobileNavbar />
    </footer>
  );
};
