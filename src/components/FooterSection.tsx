import { MobileNavbar } from '@/components/MobileNavbar';
import { mergeClassNames } from '@/lib/helper';

export const FooterSection = () => {
  const footerClasses = mergeClassNames(
    'fixed w-screen bottom-0 justify-center border-t-2 dark:border-t-gray-700',
  );

  return (
    <footer className={footerClasses}>
      <MobileNavbar />
    </footer>
  );
};
