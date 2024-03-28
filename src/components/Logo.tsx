import { Button } from '@/components/ui/button';
import { mergeClassNames } from '@/lib/helper';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  const logoClasses = mergeClassNames(
    className || '',
    'hover:bg-primary/80 hover:shadow-md hover:font-semibold active:bg-primary active:shadow-none active:font-medium'
  );
  return (
    <Button
      asChild
      className={logoClasses}>
      <Link href="/">blueturtle.dev</Link>
    </Button>
  );
}
