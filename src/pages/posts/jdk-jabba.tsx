import {
  Article,
  Blockquote,
  CodeBlock,
  Emphasis,
  Header,
  Heading2,
  Heading3,
  Hyperlink,
  Paragraph,
} from "@/article";
import { RootLayout } from "@/components/RootLayout";
import { useTheme } from "next-themes";
import { docco, a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import type { GetStaticProps, InferGetStaticPropsType, Metadata } from "next";
import Head from "next/head";
import { ArticleProps, articles } from "../../components/articles";

export const getStaticProps = (async (ctx) => {
  const filename = "jdk-jabba";

  const article = articles.find(
    (article) => article.href === `/posts/${filename}`,
  );

  return { props: { article: article } };
}) satisfies GetStaticProps<{
  article: ArticleProps | undefined;
}>;

export default function Page({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { resolvedTheme } = useTheme();
  if (article === undefined) return <></>;

  const title = article.title;
  const description = article.description;
  const createdDate = article.posted;
  const installation = `[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-Expression (
  Invoke-WebRequest "https://github.com/shyiko/jabba/raw/master/install.ps1" -UseBasicParsing
).Content`;
  const lightStyle = docco;
  const darkStyle = a11yDark;
  const style = resolvedTheme === "dark" ? darkStyle : lightStyle;

  const lsRemote = `> jabba ls-remote
1.16.0
1.16.0-1
adopt@1.16.0-1
adopt@1.16.0-0
adopt-openj9@1.16.0-1
adopt-openj9@1.16.0-0
amazon-corretto@1.17.0-0.35.1
amazon-corretto@1.11.0-11.9.1
graalvm@21.1.0
graalvm@21.0.0
openjdk@1.17.0
openjdk@1.16.0
zulu@1.17.0-0
zulu@1.16.0
`;

  const zuluAllVersion = `> jabba ls-remote "zulu@*"
zulu@1.16.0
zulu@1.15.0
zulu@1.14.0
zulu@1.13.0
zulu@1.12.0
zulu@1.11.0
zulu@1.10.0
zulu@1.9.0
zulu@1.8.282
zulu@1.8.275
zulu@1.8.272
zulu@1.8.265
zulu@1.8.262
zulu@1.8.252
zulu@1.8.242
zulu@1.8.232
  `;

  const zuluJava8 = `> jabba ls-remote "zulu@1.8"
zulu@1.8.282
zulu@1.8.275
zulu@1.8.272
zulu@1.8.265
zulu@1.8.262
zulu@1.8.252
zulu@1.8.242
zulu@1.8.232
zulu@1.8.222
zulu@1.8.212
zulu@1.8.202
zulu@1.8.201
zulu@1.8.192
zulu@1.8.181
zulu@1.8.172
zulu@1.8.163
zulu@1.8.162
zulu@1.8.152
zulu@1.8.144
zulu@1.8.131
zulu@1.8.121
zulu@1.8.112
zulu@1.8.102
zulu@1.8.101
zulu@1.8.92
zulu@1.8.91
zulu@1.8.72
zulu@1.8.71
zulu@1.8.66
zulu@1.8.65
zulu@1.8.60
zulu@1.8.51
zulu@1.8.45
zulu@1.8.40
zulu@1.8.31
zulu@1.8.25
zulu@1.8.20
zulu@1.8.11
zulu@1.8.5
zulu@1.8.0`;

  const javaGt17 = `> jabba ls-remote "*@>=1.17"
graalvm@21.1.0
graalvm@21.0.0
graalvm@20.3.2
graalvm@20.3.1
graalvm@20.3.0
graalvm@20.2.0
graalvm@20.1.0
graalvm@20.0.0
graalvm@19.3.6
graalvm@19.3.5
graalvm@19.3.4
graalvm@19.3.3
graalvm@19.3.2
graalvm@19.3.1
graalvm@19.3.0
graalvm@19.2.1
graalvm@19.2.0
graalvm@19.1.1
graalvm@19.1.0
graalvm@19.0.2
graalvm@19.0.0
graalvm-ce-java11@21.1.0
graalvm-ce-java11@21.0.0
graalvm-ce-java11@20.3.2
graalvm-ce-java11@20.3.1
graalvm-ce-java11@20.3.0
graalvm-ce-java11@20.2.0
graalvm-ce-java11@20.1.0
graalvm-ce-java11@20.0.0
graalvm-ce-java11@19.3.6
graalvm-ce-java11@19.3.5
graalvm-ce-java11@19.3.4
graalvm-ce-java11@19.3.3
graalvm-ce-java11@19.3.2
graalvm-ce-java11@19.3.1
graalvm-ce-java11@19.3.0
graalvm-ce-java16@21.1`;

  const installZuluJava8 = `> jabba install zulu@1.8
Downloading zulu@1.8.282 (https://cdn.azul.com/zulu/bin/zulu8.52.0.23-ca-jdk8.0.282-win_x64.zip)
109319135/109319135
Extracting C:\\Users\\tarmac\\AppData\\Local\\Temp\\jabba-d-355854135 to C:\\Users\\tarmac\\.jabba\\jdk\\zulu@1.8.282
zulu@1.8 -> C:\\Users\\tarmac\\.jabba\\jdk\\zulu@1.8.282`;

  const listInstalledJDK = `> jabba ls
zulu@1.17.0-0
zulu@1.8.282`;

  const listCurrentJDK = `> jabba current
zulu@1.8.282`;

  const switchJDK = `> jabba use "zulu@1.17.0-0"

> jabba current
zulu@1.17.0-0`;
  const defaultJDK = `> jabba alias default "zulu@1.8.282"
default -> C:\\Users\\tarmac\\.jabba\\jdk\\zulu@1.8.282
> jabba alias default
zulu@1.8.282
> jabba use default
> jabba current
zulu@1.8.282`;
  const findProfile = `> $profile
\\Mac\\Home\\Documents\\PowerShell\\Microsoft.PowerShell_profile.ps1`;

  const profileScriptEdited = `# 下面這行是安裝 jabba 時自動添加的，如果移除會造成 jabba 無法正常執行
if (Test-Path "C:\\Users\\tarmac\\.jabba\\jabba.ps1") { . "C:\\Users\\tarmac\\.jabba\\jabba.ps1" }

# 加上下面這行來自動執行 "jabba use default"
if (Test-Path "$env:USERPROFILE\.jabba\default.alias") { jabba use default }`;

  return (
    <RootLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <Article>
        <Header
          title={title}
          description={description}
          posted={createdDate}
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
          language="ps"
          style={style}
          showLanguageName>
          {installation}
        </CodeBlock>
        <div className="space-y-2">
          <Hyperlink
            href="https://github.com/shyiko/jabba/issues/707"
            className="mx-0 block text-sm"
            target="_blank">
            jabba use not working on Windows (installed with scoop) #707
          </Hyperlink>
          <Hyperlink
            href="https://hackmd.io/@jonz94/BJbp3lsnu"
            className="mx-0 block text-sm">
            The prefered way to install jabba is via the installation script
          </Hyperlink>
        </div>
        <Heading2>基本用法</Heading2>
        <Heading3>列出所有可用的 JDK</Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {lsRemote}
        </CodeBlock>
        <Heading3>列出所有 Zulu JDK</Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {zuluAllVersion}
        </CodeBlock>
        <Heading3>列出 Java 8 的所有 Zulu JDK</Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {zuluJava8}
        </CodeBlock>
        <Heading3>列出 Java 版本大於 17 的所有 JDK</Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {javaGt17}
        </CodeBlock>
        <Heading3>安裝 Java 版本 8 的最新 Zulu JDK </Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {installZuluJava8}
        </CodeBlock>
        <Heading3>列出已下載的 JDK</Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {listInstalledJDK}
        </CodeBlock>
        <Heading3>列出目前使用的 JDK</Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {listCurrentJDK}
        </CodeBlock>
        <Heading3>切換目前使用的 JDK</Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {switchJDK}
        </CodeBlock>
        <Heading3>
          將指定的 JDK 版本保存到名稱為 default 的 alias 方便快速切換
        </Heading3>
        <CodeBlock
          language="shell"
          style={style}>
          {defaultJDK}
        </CodeBlock>
        <Blockquote>
          這邊的
          <span className="mx-1 font-bold underline underline-offset-2">
            default
          </span>
          只是普通的 alias 跟其他的 alias 沒有什麼差別，每次啟動新的 shell
          session 的時候 jabba 並不會使用 default 作為預設版本，因此在新的
          session 裡執行 jabba current 會得到空白而不是剛剛設定的
          zulu@1.8.282，你必須在啟動新的 session 的時候手動執行
          <span className="mx-1 font-bold underline underline-offset-2">
            jabba use default
          </span>
          或是透過啟動腳本執行該指令裡實現你要的效果
        </Blockquote>
        <Heading2>進階用法</Heading2>
        <Heading3>
          修改 PowerShell Profile 來讓每次啟動 shell session 的時候自動切換成
          alias default 指向的 JDK
        </Heading3>
        先找到 profile 的所在位置
        <CodeBlock
          language="powerShell"
          style={style}
          showLanguageName>
          {findProfile}
        </CodeBlock>
        <Paragraph>
          我們可以直接把 profile 改成這樣，當 jabba 有設定 alias default
          的時候會自動在 <span className="mx-1 font-semibold ">.jabba </span>
          資料夾底下建立
          <span className="mx-1 font-semibold">default.alias</span>
          檔案，啟動 session 時透過檢查這個檔案存不存在來判斷要不要執行
          <span className="mx-1 font-semibold underline underline-offset-2">
            jabba use default
          </span>
        </Paragraph>
        <CodeBlock
          language="shell"
          style={style}>
          {profileScriptEdited}
        </CodeBlock>
        還有另一種做法是把預設要用的 JDK 加到
        <span className="mx-1 font-bold">.jabbarc</span>
        裡面，有興趣可以
        <Hyperlink href="https://github.com/shyiko/jabba?tab=readme-ov-file#usage">
          參考這裡
        </Hyperlink>
      </Article>
    </RootLayout>
  );
}
