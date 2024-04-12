import { BasicPage } from '@/components/BasicPage';
import { getMarkdownFiles } from '@/lib/mdHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ProjectCard } from '@/components/ProjectCard';

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

export default function ProjectsPage({
  mdFiles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
