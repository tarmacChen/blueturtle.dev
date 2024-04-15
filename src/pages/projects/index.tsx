import { BasicPage } from '@/components/BasicPage';
import {
  getMarkdownFiles,
  groupByYear,
  MarkdownFileGroup,
} from '@/lib/mdHelper';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { sortByOrder } from '@/lib/mdSorting';
import { MarkdownFileSortOrder } from '@/type';

const ProjectGroup = ({ group }: { group: MarkdownFileGroup }) => {
  return Object.keys(group)
    .reverse()
    .map((year) => {
      return (
        <>
          <h1
            key={year}
            className="m-1 text-2xl">
            {year}
          </h1>

          <div className="flex flex-row w-full gap-4 flex-wrap justify-center">
            {group[year].map((md) => {
              return (
                <ProjectCard
                  md={md}
                  key={md.filename}
                />
              );
            })}
          </div>
        </>
      );
    });
};

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
  const group = groupByYear(projects);

  return { props: { mdGroup: group } };
}) satisfies GetStaticProps;

export default function ProjectsPage({
  mdGroup,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BasicPage>
      <div className="mx-auto max-md:w-full w-2/3 xl:w-1/2">
        <ProjectGroup group={mdGroup} />
      </div>
    </BasicPage>
  );
}
