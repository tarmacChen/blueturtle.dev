import { getMarkdownFiles } from "@/lib/helper"
import { MarkdownFile } from "mdman"
import { PostCard } from "../../components/PostCard"
import Layout from "./layout"
import moment from "moment"

export async function getStaticProps() {
  const mdFiles = getMarkdownFiles().sort(sortByCreatedTime).reverse()
  return { props: { mdFiles } }
}

const sortByCreatedTime = (a: MarkdownFile, b: MarkdownFile): number => {
  const aTime = moment(a.metadata.createdTime)
  const bTime = moment(b.metadata.createdTime)

  if (aTime.isBefore(bTime)) return -1
  if (aTime.isAfter(bTime)) return 1
  return 0
}

export default function PostsPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  return (
    <Layout>
      {mdFiles.map((file) => {
        return (
          <div className="md:w-1/2 max-sm:w-full" key={file.filename}>
            <PostCard mdFile={file}></PostCard>
          </div>
        )
      })}
    </Layout>
  )
}
