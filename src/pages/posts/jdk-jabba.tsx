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
import { useTheme } from "next-themes";
import { docco, a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function Page() {
  const title = "在單純的 Windows 環境下使用 JDK 管理工具 - jabba";
  const description = "不能用 SDKMAN 該怎麼辦";
  const createdDate = "2023-03-16";
  const code = `[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-Expression (
  Invoke-WebRequest "https://github.com/shyiko/jabba/raw/master/install.ps1" -UseBasicParsing
).Content`;
  const { theme } = useTheme();
  const lightStyle = docco;
  const darkStyle = a11yDark;
  const style = theme === "dark" ? darkStyle : lightStyle;

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
          style={style}
          showLanguageName>
          {code}
        </CodeBlock>
        <Paragraph>
          <Hyperlink
            href="https://github.com/shyiko/jabba/issues/707"
            className="mx-0 block"
            target="_blank">
            jabba use not working on Windows (installed with scoop) #707
          </Hyperlink>
          <Hyperlink
            href="https://hackmd.io/@jonz94/BJbp3lsnu"
            className="mx-0 block">
            The prefered way to install jabba is via the installation script
          </Hyperlink>
        </Paragraph>
        <Heading2>基本用法</Heading2>
        <Heading3>列出可用的 JDK 版本</Heading3>
        <CodeBlock
          language="bash"
          style={style}>
          {`jabba ls-remote\n...\nzulu@1.6.53\nzulu@1.6.4\nzulu@1.6.47`}
        </CodeBlock>
      </Article>
    </RootLayout>
  );
}
