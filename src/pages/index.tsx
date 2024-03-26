import { PostCard } from "@/components/PostCard"
import { getMarkdownFiles, sortByCreatedTime } from "@/lib/helper"
import { MarkdownFile } from "mdman"

export async function getStaticProps() {
  const files = getMarkdownFiles().sort(sortByCreatedTime).reverse()
  const mdFiles = files.filter((file) => file.metadata.category == "posts")
  return { props: { mdFiles: mdFiles } }
}

export default function HomePage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  return (
    <div className="flex flex-col mx-auto p-4 gap-4 items-center ">
      {mdFiles.map((file) => {
        return (
          <div className="md:w-1/2 max-sm:w-full" key={file.filename}>
            <PostCard mdFile={file}></PostCard>
          </div>
        )
      })}
    </div>
  )
}
