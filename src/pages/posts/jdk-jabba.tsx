import {
  Article,
  Blockquote,
  CodeBlock,
  Header,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Hyperlink,
  Paragraph,
  PostTime,
  SubTitle,
} from "@/article";
import { RootLayout } from "@/components/RootLayout";
import { docco, a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Page() {
  const title = "在單純的 Windows 環境下使用 JDK 管理工具 - jabba";
  const description = "不能用 SDKMAN 該怎麼辦";
  const createdDate = "2023-03-16";
  const code = `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser\nInvoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression`;

  return (
    <RootLayout>
      <Article>
        <Header
          title={title}
          description={description}
          timeText={createdDate}
        />
        <Blockquote>
          先前在找 JDK 管理工具的時候，發現 SDKMAN 只能在有 bash
          的執行環境下使用，因為我的 Windows 開發環境沒有辦法安裝 WSL，
          意外找到了一個叫
          <Hyperlink
            href="https://github.com/shyiko/jabba"
            target="_blank">
            jabba
          </Hyperlink>
          的工具替代使用
        </Blockquote>
        <Heading2>避免用 Scoop 來安裝 Jabba</Heading2>
        <Paragraph>
          如果你是用
          <Hyperlink
            href="https://scoop.sh/"
            target="_blank">
            Scoop
          </Hyperlink>
          這樣的套件管理器來安裝
          Jabba，安裝好後可能會無法正常使用，建議用官方提供的 PowerShell
          腳本進行安裝
        </Paragraph>
        <CodeBlock
          language="PowerShell"
          style={docco}>
          {code}
        </CodeBlock>
      </Article>
    </RootLayout>
  );
}
