import { BasicPage } from '@/components/BasicPage';
import { getMarkdownFiles } from '@/lib/mdHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { sortByOrder } from '@/lib/mdSorting';
import { MarkdownFileSortOrder } from '@/type';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles().sort((a, b) =>
    sortByOrder(a, b, MarkdownFileSortOrder.Ascend),
  );
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
      <div className="flex flex-row w-full justify-center mx-auto gap-4 flex-wrap">
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
