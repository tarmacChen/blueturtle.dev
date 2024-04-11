import { BasicPage } from '@/components/BasicPage';
import { getMarkdownFiles, paginateElements } from '@/lib/mdHelper';
import { MarkdownFile } from 'mdman';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { SnippetCard } from '@/components/SnippetCard';

export const getStaticProps = (() => {
  const mdFiles = getMarkdownFiles();
  const env = process.env.NODE_ENV;
  const snippets = mdFiles.filter((md) => {
    const isNotIgnore = md.metadata.category != 'ignore';
    const isNotDraft = md.metadata.draft == false;
    const isSnippets = md.metadata.category == 'snippets';
    const env = process.env.NODE_ENV;

    switch (env) {
      case 'development':
        return isNotIgnore && isSnippets;
        break;
      case 'production':
        return isNotIgnore && isNotDraft && isSnippets;
        break;
      default:
        return isNotIgnore && isSnippets;
        break;
    }
  });

  const paginations = paginateElements<MarkdownFile>(snippets, 10);

  return { props: { paginations: paginations, pageIndex: 1 } };
}) satisfies GetStaticProps;

export default function SnippetsPage({
  paginations,
  pageIndex,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const snippets = paginations[pageIndex - 1];

  return (
    <BasicPage>
      <div className="flex flex-col gap-2 justify-center">
        {snippets?.map((snippet) => (
          <SnippetCard
            mdFile={snippet}
            key={snippet.filename}
          />
        ))}
      </div>
    </BasicPage>
  );
}
