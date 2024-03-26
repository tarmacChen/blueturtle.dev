import { getMarkdownFiles, sortByCreatedTime } from "@/lib/helper"
import { MarkdownFile } from "mdman"
import { PostCard } from "../../components/PostCard"
import Layout from "./layout"
import moment from "moment"

export async function getStaticProps() {
  const files = getMarkdownFiles().sort(sortByCreatedTime).reverse()
  const mdFiles = files.filter((file) => file.metadata.category == "posts")
  return { props: { mdFiles: mdFiles } }
}

export default function PostsPage({ mdFiles }: { mdFiles: MarkdownFile[] }) {
  {
    return (
      <Layout>
        {mdFiles.map((file) => {
          const createdTime = moment(file.metadata.createdTime).format("ll")
          const linkUrl = `/posts/${file.metadata?.title}`

          return (
            <div
              className="flex flex-row md:w-1/2 max-sm:w-full justify-between"
              key={file.filename}
            >
              <a
                href={linkUrl}
                className="flex flex-row w-full p-2 border-2 rounded-lg hover:text-blue-600 hover:underline justify-between"
              >
                <div>{file.metadata.title}</div>
                <div>{createdTime}</div>
              </a>
            </div>
          )
        })}
      </Layout>
    )
  }
}
