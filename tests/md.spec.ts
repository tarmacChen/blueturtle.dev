import { test, expect } from "@playwright/test"
import {
  cleanDirectory,
  createMarkdownFile,
  getMarkdownFileSaveLocation,
  saveMarkdownFile,
} from "@/lib/helper"
import moment from "moment"
import fs from "fs"

test.afterAll(() => {
  cleanDirectory()
})

test.describe("createMarkdownFile", () => {
  test("content is equal to parameter", () => {
    const fileName = getRandomMarkdownFileName()
    const content = `# title`
    const md = createMarkdownFile(fileName, content)
    expect(md.content).toEqual("# title")
  })

  test("metadata are empty when create empty file", () => {
    const fileName = getRandomMarkdownFileName()
    const content = `---
---`
    const md = createMarkdownFile(fileName, content)
    expect(md.metadata).toBeUndefined
  })

  test("metadata's author is john when inject metadata", () => {
    const fileName = getRandomMarkdownFileName()
    const content = `---
author: john
---`
    const md = createMarkdownFile(fileName, content)
    expect(md.metadata.author).toEqual("john")
  })

  test("metadata's createdTime is now when file created", () => {
    const fileName = getRandomMarkdownFileName()
    const md = createMarkdownFile(fileName)
    const mdTime = moment(md.metadata.createdTime)
    expect(mdTime.day).toEqual(moment().day)
  })

  test("metadata's createdTime is no effected when pass empty string ", () => {
    const fileName = getRandomMarkdownFileName()
    const content = `---
createdTime: ''
---`
    const md = createMarkdownFile(fileName, content)
    expect(md.metadata.createdTime).not.toEqual("")
  })

  test("filename is equal to parameter", () => {
    const fileName = getRandomMarkdownFileName()
    const md = createMarkdownFile(fileName)
    expect(md.filename).toEqual(fileName)
  })
})

test.describe("getMarkdownFileSaveLocation", () => {
  test("fullName is equal to", () => {
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
  test("file should be existed after save new markdown file", () => {
    const fileName = getRandomMarkdownFileName()
    const mdFile = createMarkdownFile(fileName, "# title\n## heading 2")
    saveMarkdownFile(mdFile)
    const fullName = getMarkdownFileSaveLocation(mdFile)
    expect(fs.existsSync(fullName)).toBeTruthy
  })

  test("file should be not existed when save empty name file", () => {
    const mdFile = createMarkdownFile("", "# title\n## heading 2")
    saveMarkdownFile(mdFile)
    saveMarkdownFile(mdFile, true)
    const fullName = getMarkdownFileSaveLocation(mdFile)
    expect(fs.existsSync(fullName)).toBeFalsy
  })

  test("content should not be replaced after save file", () => {
    const fileName = getRandomMarkdownFileName()
    const expectedContent = "# original"
    const testFile = createMarkdownFile(fileName, expectedContent)
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

  test("content should be replaced after save file", () => {
    const fileName = getRandomMarkdownFileName()
    const originalContent = "# original"
    const expectedContent = "# replace"
    const testFile = createMarkdownFile(fileName, originalContent)
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
})

test("parse string to date and restore, both should be equal", () => {
  const timestamp = "2024-03-20T01:19:46.657Z"
  const time = moment(timestamp)
  const actual = time.toISOString()
  expect(actual).toEqual(timestamp)
})

const getRandomMarkdownFileName = () => {
  const max = 10000
  const randomNumber = (Math.random() * max).toFixed(0)
  return ["test", "/", randomNumber.toString().padStart(5, "0"), ".md"].join("")
}
