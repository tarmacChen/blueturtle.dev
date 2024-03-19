import { getMarkdownFiles } from "@/lib/helper"
import { MarkdownFile } from "@/type"
import { PostCard } from "../../components/PostCard"
import Layout from "./layout"

export async function getStaticProps() {
  const mdFiles = getMarkdownFiles()
  return { props: { mdFiles } }
}

export default function PostsPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  return (
    <Layout>
      {mdFiles.map((file) => {
        return (
          <div className="w-1/2" key={file.filename}>
            <PostCard mdFile={file}></PostCard>
          </div>
        )
      })}
    </Layout>
  )
}
