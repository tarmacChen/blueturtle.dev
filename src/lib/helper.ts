import fs from 'fs';
import path from 'path';

const envName = 'MARKDOWN_FILES_LOCATION';
const envValue = process.env[envName];

export function getMarkdownFiles() {
  const rootDir = envValue || 'data';
  const searchLocation = path.join(process.cwd(), rootDir);
  const dirExists = fs.existsSync(searchLocation);

  if (dirExists == false) {
    console.error('Markdown location is not exists:');
    console.error(searchLocation);
    return [];
  }

  const foundFiles = fs.readdirSync(searchLocation, { recursive: true });
  const filepaths: string[] = [];

  foundFiles.map((filename) => {
    filepaths.push(path.join(rootDir, filename.toString()));
  });
  const mdFiles = filepaths.filter((path) => path.endsWith('.md') == true);

  return mdFiles;
}
