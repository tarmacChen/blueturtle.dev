import { BasicPage } from '@/components/BasicPage';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

type AboutInfo = {
  title: string;
  email: string;
  mbtiImageUrl: string;
  mbtiLinkUrl: string;
};

export const getStaticProps = (() => {
  const info: AboutInfo = {
    title: 'About Me 關於我',
    email: 'tarmac.chen@gmail.com',
    mbtiImageUrl: '/img/mbti.png',
    mbtiLinkUrl: 'https://www.16personalities.com/tw/結果/intj-t/m/ui1x55vpy',
  };

  return { props: { info: info } };
}) satisfies GetStaticProps;

export default function AboutPage({
  info,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BasicPage>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{info.title}</h1>
        <h2 className="text-lg">聯絡方式</h2>
        <a className="underline text-blue-600">{info.email}</a>
        <h2 className="text-lg">MBTI</h2>
        <a
          href={info.mbtiLinkUrl}
          target="_blank">
          <Image
            src={info.mbtiImageUrl}
            alt="MBTI Test Result"
            width={0}
            height={0}
            className="mx-auto w-auto h-auto"
          />
        </a>
      </div>
    </BasicPage>
  );
}
