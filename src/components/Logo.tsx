import { Button } from '@/components/ui/button';
import { mergeClassNames } from '@/lib/helper';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  const logoClasses = mergeClassNames(
    className || '',
    'bg-blue-600 hover:bg-blue-600 hover:shadow-md hover:font-semibold active:bg-primary active:shadow-none active:font-medium text-white',
  );
  return (
    <Button
      asChild
      className={logoClasses}>
      <Link href="/">blueturtle.dev</Link>
    </Button>
  );
}
