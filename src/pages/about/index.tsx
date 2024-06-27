import { BasicPage } from '@/components/BasicPage';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

type AboutInfo = {
  title: string;
  email: string;
};

export const getStaticProps = (() => {
  const info: AboutInfo = {
    title: '關於我',
    email: 'tarmac.chen@gmail.com',
  };

  return { props: { info: info } };
}) satisfies GetStaticProps;

export default function AboutPage({
  info,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BasicPage>
      <div className="mx-auto flex flex-col gap-2 text-center">
        <h1 className="text-lg">聯絡方式</h1>
        <a className="text-blue-600 dark:text-white">{info.email}</a>
      </div>
    </BasicPage>
  );
}
