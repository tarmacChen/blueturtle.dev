import { test, expect } from "@playwright/test"
import {
  createMarkdownFile,
  getMarkdownFileSaveLocation,
  saveMarkdownFile,
} from "@/lib/helper"
import moment from "moment"
import fs from "fs"

test.describe("createMarkdownFile", () => {
  test("content is equal to parameter", async () => {
    const content = `# title`
    const md = createMarkdownFile("test.md", content)
    expect(md.content).toEqual("# title")
  })

  test("metadata are empty when create empty file", async () => {
    const content = `---
---`
    const md = createMarkdownFile("test.md", content)
    expect(md.metadata).toBeUndefined
  })

  test("metadata's author is john when inject metadata", async () => {
    const content = `---
author: john
---`
    const md = createMarkdownFile("test.md", content)
    expect(md.metadata.author).toEqual("john")
  })

  test("metadata's createdTime is now when file created", async () => {
    const md = createMarkdownFile("empty.md")
    const mdTime = moment(md.metadata.createdTime)
    expect(mdTime.day).toEqual(moment().day)
  })

  test("metadata's createdTime is no effected when pass empty string ", async () => {
    const content = `---
createdTime: ''
---`
    const md = createMarkdownFile("test.md", content)
    expect(md.metadata.createdTime).not.toEqual("")
  })

  test("filename is equal to parameter", async () => {
    const md = createMarkdownFile("empty.md")
    expect(md.filename).toEqual("empty.md")
  })

  test("parse string to date and restore, both should be equal", async () => {
    const timestamp = "2024-03-20T01:19:46.657Z"
    const time = moment(timestamp)
    const actual = time.toISOString()
    expect(actual).toEqual(timestamp)
  })
})

test.describe("getMarkdownFileSaveLocation", () => {
  test("fullName is equal to", async () => {
    const testCases = [
      ["", ""],
      ["test.md", "data/test.md"],
      ["posts/first.md", "data/posts/first.md"],
      ["frontend/react/tutorial.md", "data/frontend/react/tutorial.md"],
    ]

    testCases.forEach((value) => {
      const mdFile = createMarkdownFile(value[0], "# title")
      const actual = getMarkdownFileSaveLocation(mdFile)
      const expected = value[1]
      expect(actual).toEqual(expected)
    })
  })
})

test.describe("saveMarkdownFile", () => {
  test("file should be existed after save new markdown file", async () => {
    const mdFile = createMarkdownFile("test.md", "# title\n## heading 2")
    saveMarkdownFile(mdFile)
    const fullName = getMarkdownFileSaveLocation(mdFile)
    expect(fs.existsSync(fullName)).toBeTruthy
  })

  test("markdown file's content should not be replaced after save file", async () => {
    const expectedContent = "# original"
    const testFile = createMarkdownFile("test.md", expectedContent)
    const fullName = getMarkdownFileSaveLocation(testFile)
    if (fs.existsSync(fullName)) {
      fs.rmSync(fullName)
    }

    saveMarkdownFile(testFile, true)
    testFile.content = "# replace"
    saveMarkdownFile(testFile)

    const actual = fs.readFileSync(fullName, "utf-8")
    expect(actual).toEqual(expectedContent)
  })

  test("markdown file's content should be replaced after save file", async () => {
    const originalContent = "# original"
    const expectedContent = "# replace"
    const testFile = createMarkdownFile("test.md", originalContent)
    const fullName = getMarkdownFileSaveLocation(testFile)
    if (fs.existsSync(fullName)) {
      fs.rmSync(fullName)
    }

    saveMarkdownFile(testFile, true)
    testFile.content = expectedContent
    saveMarkdownFile(testFile, true)

    const actual = fs.readFileSync(fullName, "utf-8")
    expect(actual).toEqual(expectedContent)
  })

  test("file should be not existed when save empty name file", async () => {
    const mdFile = createMarkdownFile("", "# title\n## heading 2")
    saveMarkdownFile(mdFile)
    saveMarkdownFile(mdFile, true)
    const fullName = getMarkdownFileSaveLocation(mdFile)
    expect(fs.existsSync(fullName)).toBeFalsy
  })
})
