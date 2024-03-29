import { Button } from '@/components/ui/button';
import { mergeClassNames } from '@/lib/helper';

export const ScrollToTop = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const buttonClasses = mergeClassNames(className || '');
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      onClick={handleClick}
      className={buttonClasses}>
      {children}
    </Button>
  );
};
