import { BasicPage } from '@/components/BasicPage';
import { getMarkdownFiles } from '@/lib/staticHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { sortByWeight } from '@/lib/mdSorting';
import { MarkdownFileSortOrder } from '@/type';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles()
    .filter((md) => md.metadata.type == 'project')
    .sort((a, b) => sortByWeight(a, b, MarkdownFileSortOrder.Ascend));
  const env = process.env.NODE_ENV;
  const devProjects = mdFiles;
  const prodProjects = mdFiles.filter((md) => md.metadata.draft == false);
  const projects = env == 'development' ? devProjects : prodProjects;

  return { props: { projects: projects } };
}) satisfies GetStaticProps;

export default function ProjectsPage({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BasicPage>
      <div className="flex w-full flex-row flex-wrap justify-center gap-4">
        {projects.map((project) => {
          return (
            <ProjectCard
              project={project}
              key={project.filename}
            />
          );
        })}
      </div>
    </BasicPage>
  );
}
