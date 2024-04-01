import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MarkdownFile, MarkdownMetadata } from 'mdman';
import moment from 'moment';
import { MarkdownFileSortOrder } from "@/type";

const envName = 'MARKDOWN_FILES_LOCATION';
const envValue = process.env[envName];
const rootDir = envValue || 'contents';
const placeLocation = path.join(process.cwd(), rootDir);

export function getMarkdownFiles(): MarkdownFile[] {
  const dirExists = fs.existsSync(placeLocation);

  if (dirExists == false) {
    console.error('Markdown location is not exists:');
    console.error(placeLocation);
    return [];
  }

  const foundFiles = fs.readdirSync(placeLocation, {recursive: true});
  const mdFiles: MarkdownFile[] = [];

  foundFiles.map((filename) => {
    const name = path.join(rootDir, filename.toString());
    if (name.endsWith('.md') == false) return;

    const content = fs.readFileSync(name, 'utf-8');
    const matterResults = matter(content);

    mdFiles.push({
      filename: name,
      content: matterResults.content,
      metadata: matterResults.data,
    });
  })
  return mdFiles.sort(sortByCreatedTimeDescend);
}

export function paginateElements<T>(elements: any[], pageSize: number) {
  const groups = []
  const pages = elements.length / pageSize
  let index = 0

  while (index < pages) {
    groups.push(elements.slice((index * pageSize), pageSize + (index * pageSize)))
    index++;
  }
  return groups as T[][];
}

export function createMarkdownFile(name: string, content?: string) {
  const md = matter(content ?? '');
  const metadata: MarkdownMetadata = {
    createdTime: moment().toISOString(),
  };
  md.data = {
    ...md.data,
    ...metadata,
  };

  const mdFile: MarkdownFile = {
    filename: name ?? '',
    content: md.content,
    metadata: md.data,
  };
  return mdFile;
}

export function getMarkdownFileSaveLocation(mdFile: MarkdownFile) {
  const fullName =
    mdFile.filename == '' ? '' : path.join(rootDir, mdFile.filename);
  return fullName;
}

export function saveMarkdownFile(
  mdFile: MarkdownFile,
  replace: boolean = false
) {
  const fullName = getMarkdownFileSaveLocation(mdFile);
  const dirName = path.dirname(fullName);
  const content = mdFile.content ?? '';

  if (fs.existsSync(dirName) == false) fs.mkdirSync(dirName);
  if (fs.existsSync(fullName) && replace == false) return;
  if (path.basename(fullName) == '') return;

  fs.writeFileSync(fullName, content);
}

export function cleanTestDirectory() {
  const dir = path.join(rootDir, 'test');
  fs.rmSync(dir, {force: true, recursive: true});
}

export const sortByCreatedTime = (a: MarkdownFile, b: MarkdownFile, order: MarkdownFileSortOrder): number => {
  if (order == MarkdownFileSortOrder.Descend) return sortByCreatedTimeDescend(a, b)
  if (order == MarkdownFileSortOrder.Ascend) return sortByCreatedTimeAscend(a, b)
  return 0
};

const sortByCreatedTimeDescend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aTime = moment(a.metadata.createdTime);
  const bTime = moment(b.metadata.createdTime);

  if (aTime.isBefore(bTime)) return 1;
  if (aTime.isAfter(bTime)) return -1;
  return 0;
}

const sortByCreatedTimeAscend = (a: MarkdownFile, b: MarkdownFile): number => {
  const aTime = moment(a.metadata.createdTime);
  const bTime = moment(b.metadata.createdTime);

  if (aTime.isBefore(bTime)) return -1;
  if (aTime.isAfter(bTime)) return 1;
  return 0;
}
