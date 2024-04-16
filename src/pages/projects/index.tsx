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
      <div className="mx-auto max-md:w-full w-2/3 xl:w-1/2">
        <div className="flex flex-row w-full gap-4 flex-wrap justify-center">
          {projects.map((project) => {
            return (
              <ProjectCard
                project={project}
                key={project.filename}
              />
            );
          })}
        </div>
      </div>
    </BasicPage>
  );
}
