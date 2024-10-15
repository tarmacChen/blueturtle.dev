import {
  Article,
  Blockquote,
  CodeBlock,
  Emphasis,
  Header,
  Heading2,
  Heading3,
  Hyperlink,
  ListItems,
  Paragraph,
} from "@/article";
import { ArticleProps, articles } from "@/components/articles";
import { RootLayout } from "@/components/RootLayout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = (async (ctx) => {
  const filename = "authentication";

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
  if (article === undefined) return <></>;
  const saltFile = `// salt.js
const salt = () => crypto.randomBytes(8).toString("base64");
return console.log(salt());`;
  const salt = "YsIxk2QDHfo=";
  const execSalt = `> node salt.js
${salt}`;
  const hashFile = `// hash.js
const salt = "YsIxk2QDHfo=";
const hash = crypto.createHmac("sha256", "123").update(salt).digest("hex");
return console.log(hash())`;
  const hash =
    "30c20a0410bccb6c846c23ce4e26bf13ad3a7dd0b4fdc49f6f81d11b26885ac5";
  const execHash = `> node hash.js
${hash}`;

  return (
    <RootLayout>
      <Head>
        <title>{article.title}</title>
      </Head>
      <Article>
        <Header {...article}></Header>
        <Heading2>什麼是 Authentication</Heading2>
        <Paragraph>
          Authentication
          是驗證或認證身份，最常見的方法就是帳號密碼登入，也可以用憑證或是生物辨識的方式來確認
        </Paragraph>
        <Heading2>與 Authorization 的差別</Heading2>
        <Paragraph>
          另一個名詞 Authorization 是用來確認使用者是否擁有存取各功能的權限
        </Paragraph>
        <Table className="my-2 border-[1px]">
          <TableCaption></TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Authentication</TableHead>
              <TableHead>Authorization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>你是誰？</TableCell>
              <TableCell>你可以做什麼？</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Heading2>帳號密碼登入</Heading2>
        <Heading3>不要幫使用者保存密碼</Heading3>
        <Blockquote>
          使用者嘗試註冊帳號，帳號及密碼分別為
          <span className="mx-2 font-semibold ">jessica</span>及
          <span className="mx-2 font-semibold ">123</span>
        </Blockquote>
        <Paragraph>
          這個時候不應該直接保存使用者的密碼，這是一件很危險的事情，一旦選擇幫使用者保存密碼後續就要增加很多工作來避免資料外洩的問題，並且會洩漏密碼給系統管理員，一勞永逸的方法是讓使用者自己記住密碼(私鑰)，永遠不替使用者保存密碼
        </Paragraph>
        <Heading3>替密碼加密</Heading3>
        <Paragraph>
          <ListItems className="list-disc">
            <li>
              <span className="mr-1 font-semibold">MTIz</span>這是 123
            </li>
            <li>
              <span className="mr-1 font-semibold">
                30c20a0410bccb6c846c23ce4e26bf13ad3a7dd0b4fdc49f6f81d11b26885ac5
              </span>
              這也是 123
            </li>
          </ListItems>
        </Paragraph>
        <Paragraph>
          前面的 <span className="mx-1 font-semibold">MTIz</span>
          可以透過 base64 解碼得到答案(123)，後面的
          <span className="mx-1 font-semibold">30c20a......</span>
          多做了一些處理必須要有 salt (public key) 及 password (private key)
          才能知道答案
        </Paragraph>
        <Heading3 id="add-salt">在密碼上灑點鹽 (salt)</Heading3>
        <Paragraph>
          我們可以在使用者註冊帳號時產生一組 public key
          並將它保存起來，這組專門用來驗證密碼的 public key 我們稱它為
          salt，它是一組在使用者註冊時隨機產生的文字，這邊用 JavaScript 呼叫
          <Hyperlink
            href="https://node.readthedocs.io/en/latest/api/crypto/"
            target="_blank">
            crypto
          </Hyperlink>
          函式庫來做範例
        </Paragraph>
        <CodeBlock
          language="javaScript"
          showLanguageName>
          {saltFile}
        </CodeBlock>
        <CodeBlock language="bash">{execSalt}</CodeBlock>
        <Paragraph>
          再將 salt 與使用者註冊設定的密碼做計算得到一組雜湊值 (hash)
        </Paragraph>
        <CodeBlock
          language="javaScript"
          showLanguageName>
          {hashFile}
        </CodeBlock>
        <CodeBlock language="bash">{execHash}</CodeBlock>
        <Paragraph>
          之後每次登入我們會拿輸入的密碼與該使用者擁有的 salt 做計算看結果
          (hash) 跟註冊時得到的 hash
          有沒有吻合，如果不一樣就是密碼輸入錯誤，除了使用者本人以外沒有人知道密碼
          (private key) 是什麼
        </Paragraph>
        <Paragraph className="text-nowrap">
          <CheckIcon className="inline-block size-6 text-green-600" />
          <Emphasis>{salt}</Emphasis> + <Emphasis>123</Emphasis> =
          <Emphasis>
            30c20a0410bccb6c846c23ce4e26bf13ad3a7dd0b4fdc49f6f81d11b26885ac5
          </Emphasis>
        </Paragraph>
        <Paragraph className="text-nowrap">
          <Cross2Icon className="inline-block size-6 text-red-600" />
          <Emphasis>{salt}</Emphasis> + <Emphasis>1234</Emphasis> =
          <Emphasis>
            3b4f722ef0094771ca3a62db7253800ff3d057c812eb7529064e3214f08ad905
          </Emphasis>
        </Paragraph>
        <Heading3>鹽巴記得換新</Heading3>
        <Paragraph>
          在使用者註冊帳號或是更換密碼成功時 (牽涉到 private key
          變更)，我們應該替使用者更換一組新的 salt
        </Paragraph>
        <Heading2>記住使用者的登入狀態</Heading2>
        <Paragraph>
          加上記住使用者登入狀態的功能，避免使用者在短時間內頻繁操作登入動作提升進一步提升使用者體驗
        </Paragraph>
        <Heading3>Session Token</Heading3>
        回顧剛剛
        <span className="mx-1 font-semibold underline decoration-dotted underline-offset-4 hover:cursor-pointer">
          <a href="#add-salt">替密碼撒點鹽 (salt)</a>
        </span>
        的做法，我們可以用同樣的方式實作記住登入狀態的功能
      </Article>
    </RootLayout>
  );
}
