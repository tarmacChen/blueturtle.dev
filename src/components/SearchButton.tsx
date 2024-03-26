import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export const SearchButton = ({ className }: { className?: string }) => {
  {
    const containerClasses = [
      "flex flex-row rounded-lg gap-2 items-center",
      className,
    ].join(" ")

    return (
      <div className={containerClasses}>
        <MagnifyingGlassIcon width="20" height="20" />
        <Input type="text" placeholder="Search..." />
      </div>
    )
  }
}
