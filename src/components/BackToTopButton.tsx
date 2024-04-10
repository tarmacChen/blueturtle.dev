import { Button } from '@/components/ui/button';
import { mergeClassNames } from '@/lib/helper';
import { useScroll } from '@/hooks/useScroll';

export const BackToTopButton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const buttonClasses = mergeClassNames(className || '');
  const { scrollToTop } = useScroll();

  return (
    <Button
      onClick={scrollToTop}
      className={buttonClasses}>
      {children}
    </Button>
  );
};
