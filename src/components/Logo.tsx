import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Logo() {
  return (
    <Button asChild>
      <Link href="/">blueturtle.dev</Link>
      {/* <a href="/">blueturtle.dev</a> */}
    </Button>
  );
}
