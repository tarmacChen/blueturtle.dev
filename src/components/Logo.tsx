import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Button asChild className={className}>
      <Link href="/">blueturtle.dev</Link>
    </Button>
  )
}
