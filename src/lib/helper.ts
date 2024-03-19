import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MarkdownFile } from "@/type"

const envName = "MARKDOWN_FILES_LOCATION"
const envValue = process.env[envName]

export function getMarkdownFiles(): MarkdownFile[] {
  const rootDir = envValue || "data"
  const searchLocation = path.join(process.cwd(), rootDir)
  const dirExists = fs.existsSync(searchLocation)

  if (dirExists == false) {
    console.error("Markdown location is not exists:")
    console.error(searchLocation)
    return []
  }

  const foundFiles = fs.readdirSync(searchLocation, { recursive: true })
  const files: MarkdownFile[] = []

  foundFiles.map((filename) => {
    const name = path.join(rootDir, filename.toString())
    if (name.endsWith(".md") == false) return

    const content = fs.readFileSync(name, "utf-8")
    const matterResults = matter(content)

    files.push({
      filename: name,
      content: matterResults.content,
      data: matterResults.data,
    })
  })
  return files
}
