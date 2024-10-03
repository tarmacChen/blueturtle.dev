import {
  Article,
  Blockquote,
  Emphasis,
  Header,
  ListItems,
  Paragraph,
} from "@/article";
import { RootLayout } from "@/components/RootLayout";
import Head from "next/head";

export default function Page() {
  const title = "同步 MTP Device 的資料";
  const description = "使用 mtpcopy";
  const createdDate = "2023-4-26";

  return (
    <RootLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Article>
        <Header
          title={title}
          description={description}
          timeText={createdDate}></Header>
        <Blockquote>
          一個儲存裝置透過 USB 連接到電腦，它的連接協定不是用
          <Emphasis>USB MSC</Emphasis>(Usb Mass Storage Device Class) 而是用
          <Emphasis>MTP</Emphasis>
          ，如果想同步裝置的資料可以怎麼做?
        </Blockquote>
        <Paragraph>
          與<Emphasis>USB MSC</Emphasis>
          不同的是，透過<Emphasis>MTP</Emphasis>
          協定連接的儲存裝置不像一般的隨身碟會掛載到檔案系統中，在電腦裡找不到一個實際存在的儲存空間(Volume)可以操作
          <ListItems title="我的同步任務需要同時滿足以下兩個條件">
            <li>只複製裝置上不存在的檔案過去</li>
            <li>遇到檔案已存在裝置上時自動忽略</li>
          </ListItems>
        </Paragraph>
      </Article>
    </RootLayout>
  );
}
