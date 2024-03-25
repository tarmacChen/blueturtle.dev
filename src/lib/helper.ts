import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MarkdownFile, MarkdownMetadata } from "@/type"
import moment from "moment"

const envName = "MARKDOWN_FILES_LOCATION"
const envValue = process.env[envName]
const rootDir = envValue || "contents"
const placeLocation = path.join(process.cwd(), rootDir)

export function getMarkdownFiles(): MarkdownFile[] {
  const dirExists = fs.existsSync(placeLocation)

  if (dirExists == false) {
    console.error("Markdown location is not exists:")
    console.error(placeLocation)
    return []
  }

  const foundFiles = fs.readdirSync(placeLocation, { recursive: true })
  const files: MarkdownFile[] = []

  foundFiles.map((filename) => {
    const name = path.join(rootDir, filename.toString())
    if (name.endsWith(".md") == false) return

    const content = fs.readFileSync(name, "utf-8")
    console.log(content)
    const matterResults = matter(content)

    files.push({
      filename: name,
      content: matterResults.content,
      metadata: matterResults.data,
    })
  })
  return files
}

export function createMarkdownFile(name: string, content?: string) {
  const md = matter(content ?? "")
  const metadata: MarkdownMetadata = {
    createdTime: moment().toISOString(),
  }
  md.data = {
    ...md.data,
    ...metadata,
  }

  const mdFile: MarkdownFile = {
    filename: name ?? "",
    content: md.content,
    metadata: md.data,
  }
  return mdFile
}

export function getMarkdownFileSaveLocation(mdFile: MarkdownFile) {
  const fullName =
    mdFile.filename == "" ? "" : path.join(rootDir, mdFile.filename)
  return fullName
}

export function saveMarkdownFile(
  mdFile: MarkdownFile,
  replace: boolean = false
) {
  const fullName = getMarkdownFileSaveLocation(mdFile)
  const dirName = path.dirname(fullName)
  const content = mdFile.content ?? ""

  if (fs.existsSync(dirName) == false) fs.mkdirSync(dirName)
  if (fs.existsSync(fullName) && replace == false) return
  if (path.basename(fullName) == "") return

  fs.writeFileSync(fullName, content)
}

export function cleanTestDirectory() {
  const dir = path.join(rootDir, "test")
  fs.rmSync(dir, { force: true, recursive: true })
}
