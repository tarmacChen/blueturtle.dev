import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MarkdownFile, MarkdownMetadata } from 'mdman';
import moment from 'moment';
import { sortByCreatedTime } from '@/lib/mdSorting';
import { MarkdownFileSortOrder } from '@/type';
import { ProjectCard } from '@/components/ProjectCard';

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

  const foundFiles = fs.readdirSync(placeLocation, { recursive: true });
  const mdFiles: MarkdownFile[] = [];

  foundFiles.map((filename) => {
    const name = path.join(rootDir, filename.toString());
    if (name.endsWith('.md') == false) return;

    const content = fs.readFileSync(name, 'utf-8');
    const matterResults = matter(content);

    const newFile: MarkdownFile = {
      filename: name,
      content: matterResults.content,
      metadata: matterResults.data,
    };

    mdFiles.push(newFile);
  });
  return mdFiles.sort((a, b) =>
    sortByCreatedTime(a, b, MarkdownFileSortOrder.Descend),
  );
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
  replace: boolean = false,
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
  fs.rmSync(dir, { force: true, recursive: true });
}

export const TranspileMarkdownFile = (md: MarkdownFile) => {
  const scopePattern = /{{[\w \t]+}}/g;
  const wordPattern = /[\w\-_]+/g;
  const scopes = md.content.match(scopePattern);

  scopes?.map((scope) => {
    const words = scope.match(wordPattern);
    const word = words != null ? words[0] : '';
    const existed = Object.keys(md.metadata).includes(word);
    if (existed == false) return;

    Object.entries(md.metadata).map((pair) => {
      const key = pair[0];
      const val = pair[1];

      if (key == word) {
        md.content = md.content.replace(scope, val.toString());
      }
    });
  });

  return md;
};

export type MarkdownFileGroup = {
  [key: string]: MarkdownFile[];
};

export const groupByYear = (mdFiles: MarkdownFile[]): MarkdownFileGroup => {
  const group: MarkdownFileGroup = {};

  mdFiles.map((md) => {
    const year = moment(md.metadata.createdTime).year();
    if (group[year] == undefined) group[year] = [];
    group[year].push(md);
  });

  return group;
};
