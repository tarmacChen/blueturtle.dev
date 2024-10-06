import {
  Article,
  Blockquote,
  Emphasis,
  Heading2,
  Header,
  ListItems,
  Paragraph,
  Hyperlink,
  CodeBlock,
} from "@/article";
import { RootLayout } from "@/components/RootLayout";
import { useTheme } from "next-themes";
import Head from "next/head";
import { docco, a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Page() {
  const title = "在 MTP 協定裡透過命令列同步資料";
  const description = "使用 mtpcopy";
  const createdDate = "2023-4-26";
  const { theme } = useTheme();
  const lightStyle = docco;
  const darkStyle = a11yDark;
  const style = theme === "dark" ? darkStyle : lightStyle;

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
          一個裝置透過 USB 連接到電腦，它的連接協定不是用
          <span className="mx-1 font-bold underline underline-offset-2">
            USB MSC
          </span>
          (Storage Device Class) 而是用
          <span className="mx-1 font-bold underline underline-offset-2">
            MTP
          </span>
          ，如果想同步裝置裡的資料可以怎麼做?
        </Blockquote>
        <Heading2>什麼地方會用 MTP 協定來連接裝置 ?</Heading2>
        <Paragraph>
          數位相機、智慧型手機、其他多媒體裝置 (像是 Walkman、MP3 Player)
        </Paragraph>
        <Heading2>手動操作同步資料</Heading2>
        <Paragraph>
          Windows 作業系統本身有支援 MTP 協定連接 USB 裝置 (Windows Vista
          之後的版本，Windows XP 及其以前的版本可以透過安裝 Windows Media Player
          來支援)，裝置連接後可以直接在檔案總管裡找到裝置進行操作，如果是 macOS
          就沒有原生支援了要找其他軟體像是
          <Hyperlink
            href="https://openmtp.ganeshrvel.com/"
            target="_blank">
            OpenMTP
          </Hyperlink>
          ,
          <Hyperlink
            href="https://www.hyperintegrate.com/products/mtp-for-mac"
            target="_blank">
            MTP for Mac
          </Hyperlink>
          來進行操作，手動操作同步資料對我來說不是很理想，當發生衝突的時候（重複檔案）還要逐一確認要覆蓋還是略過檔案，因此我想用命令列來幫助我完成同步任務
        </Paragraph>
        <Heading2>透過命令列同步資料</Heading2>
        <Paragraph>
          與 USB MSC 不同的是，透過 MTP
          協定連接的裝置不像常見的隨身碟會掛載到檔案系統中，在電腦裡找不到一個實際存在的儲存空間
          (Volume) 可以操作，因此不能用這樣的指令來操作檔案
        </Paragraph>
        <CodeBlock
          language="bash"
          showLanguageName
          style={style}>
          cp "/Media Library/Music/*.*" "/Device/Music/"
        </CodeBlock>
        <Paragraph>
          你也可以找到其他方法來把 MTP 裝置掛載到檔案系統中，或是使用
          <Hyperlink
            href="https://github.com/kzmi/mtpcopy"
            target="_blank">
            mtpcopy
          </Hyperlink>
        </Paragraph>
      </Article>
    </RootLayout>
  );
}
