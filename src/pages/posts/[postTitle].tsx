import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from "next"
import { getMarkdownFiles } from "@/lib/helper"
import { MarkdownFile } from "@/type"
import type { GetStaticPathsResult } from "next"
import { MarkdownViewer } from "@/components/Markdown"
import Layout from "./layout"
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism"

export const getStaticPaths = (async () => {
  const mdFiles = getMarkdownFiles()
  const result: GetStaticPathsResult = { paths: [], fallback: false }

  mdFiles.map((file) => {
    result.paths.push({
      params: { postTitle: file.metadata?.title },
    })
  })

  return result
}) satisfies GetStaticPaths

export const getStaticProps = (async (ctx) => {
  const mdFiles = getMarkdownFiles()
  const title = ctx.params?.["postTitle"]
  const foundFile = mdFiles.find((file) => file.metadata?.title == title)

  return { props: { md: foundFile } }
}) satisfies GetStaticProps<{
  md: MarkdownFile | undefined
}>

export default function Page({
  md,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <MarkdownViewer
        markdown={{ content: md?.content }}
        style={materialOceanic}
      ></MarkdownViewer>
    </Layout>
  )
}
