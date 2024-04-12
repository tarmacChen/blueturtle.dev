import { BasicPage } from '@/components/BasicPage';
import { getMarkdownFiles } from '@/lib/mdHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MarkdownFile } from 'mdman';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLinkIcon, LayersIcon } from '@radix-ui/react-icons';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles();
  const env = process.env.NODE_ENV;
  const devProjects = mdFiles.filter(
    (md) => md.metadata.category == 'projects',
  );
  const prodProjects = mdFiles.filter(
    (md) => md.metadata.category == 'projects' && md.metadata.draft == false,
  );
  const projects = env == 'development' ? devProjects : prodProjects;

  return { props: { mdFiles: projects } };
}) satisfies GetStaticProps;

const SourceButton = ({ url }: { url: string }) => (
  <Link href={url}>
    <Button className="flex flex-row rounded-md gap-2">
      Source
      <ExternalLinkIcon />
    </Button>
  </Link>
);

const DemoButton = ({ url }: { url: string }) => (
  <Link href={url}>
    <Button className="flex flex-row rounded-md gap-2">
      Demo
      <LayersIcon />
    </Button>
  </Link>
);

const ProjectCard = ({ md }: { md: MarkdownFile }) => {
  return (
    <Card className="w-64 border-gray-500 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>{md.metadata.title}</CardTitle>
        <CardDescription>{md.metadata.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-row gap-2">
          {md.metadata.sourceUrl && (
            <SourceButton url={md.metadata.sourceUrl} />
          )}
          {md.metadata.demoUrl && <DemoButton url={md.metadata.demoUrl} />}
        </div>
      </CardFooter>
    </Card>
  );
};

export default function ProjectsPage({
  mdFiles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(mdFiles);

  return (
    <BasicPage>
      <div className="flex flex-row max-md:w-full w-2/3 xl:w-1/2 justify-center mx-auto">
        {mdFiles?.map((md) => {
          return (
            <ProjectCard
              md={md}
              key={md.filename}
            />
          );
        })}
      </div>
    </BasicPage>
  );
}
