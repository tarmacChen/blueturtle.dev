import {
  Article,
  Blockquote,
  CodeBlock,
  Emphasis,
  Header,
  Heading2,
  Heading3,
  Heading4,
  Hyperlink,
  ListItems,
  Paragraph,
} from "@/article";
import { ArticleProp, articleProperties } from "@/components/articleProperties";
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

  const article = articleProperties.find(
    (article) => article.href === `/articles/${filename}`,
  );

  return { props: { article: article } };
}) satisfies GetStaticProps<{
  article: ArticleProp | undefined;
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
          是驗證或認證身份，最常見的就是帳號密碼登入，也可以透過憑證或是生物辨識來確認身份
        </Paragraph>
        <Heading2>與 Authorization 的差別</Heading2>
        <Paragraph>
          與 Authentication 不同，Authorization
          是用來確認使用者是否擁有存取各個功能的權限
        </Paragraph>
        <Table className="my-2">
          <TableHeader className="bg-gray-200 dark:bg-gray-800">
            <TableRow className="font-semibold">
              <TableCell>Authentication</TableCell>
              <TableCell>Authorization</TableCell>
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
          使用者嘗試註冊帳號，帳號密碼設定分別是
          <span className="mx-2 font-semibold ">jessica</span>及
          <span className="mx-2 font-semibold ">123</span>
        </Blockquote>
        <Paragraph>
          這時候不應該在服務器上保存使用者的密碼，這是一件很危險的事情，一旦選擇幫使用者保存密碼後續就要增加很多工作來避免資料外洩或其他資安的問題，密碼保存在服務器上讓系統管理員能夠看見(不管有沒有加密)不是一件好事情，最理想的方案是讓使用者自己記住密碼(私鑰)，服務器永遠不替使用者保存密碼
        </Paragraph>
        <Heading3>編碼及加密</Heading3>
        <ListItems className="list-disc space-y-2">
          <li>
            <span className="mr-1 font-semibold underline">MTIz</span>這是 123
          </li>
          <li>
            <span className="mr-1 font-semibold underline">
              30c20a0410bccb6c846c23ce4e26bf13ad3a7dd0b4fdc49f6f81d11b26885ac5
            </span>
            這也是 123
          </li>
        </ListItems>
        <Paragraph>
          如果只是將密碼用特定的編碼方式保存起來對提升安全性沒有任何幫助的，前面的
          <span className="mx-1 font-semibold">MTIz</span>
          可以透過 base64 解碼得到答案為 123，後面的
          <span className="mx-1 font-semibold">30c20a......</span>
          多了非對稱密碼學的處理必須要有 salt (public key) 及 password (private
          key) 才能知道答案
        </Paragraph>
        <Heading3 id="add-salt">在密碼上灑點鹽 (Salt)</Heading3>
        <Paragraph>
          我們可以在使用者註冊帳號時產生一組 public key
          並將它保存在服務器內，這組專門用來驗證密碼的 public key 我們稱它為
          <span className="mx-1 font-semibold underline">salt</span>
          ，它是一組在使用者註冊時隨機產生的文字，這邊用 JavaScript 處理做舉例
        </Paragraph>
        <CodeBlock
          language="javaScript"
          showLanguageName>
          {saltFile}
        </CodeBlock>
        <CodeBlock language="bash">{execSalt}</CodeBlock>
        <Paragraph>
          再將 salt 與註冊帳號設定的密碼做計算得到一組雜湊值 (hash)，與 salt
          一樣要保存在服務器內
        </Paragraph>
        <CodeBlock
          language="javaScript"
          showLanguageName>
          {hashFile}
        </CodeBlock>
        <CodeBlock language="bash">{execHash}</CodeBlock>
        <Paragraph>
          之後每次登入我們會拿輸入的密碼與該使用者擁有的 salt
          做計算看結果跟註冊帳號時保存的 hash
          有沒有吻合，如果不一樣就是密碼輸入錯誤，除了使用者本人以外沒有人知道密碼
          (private key) 是什麼
        </Paragraph>
        <Table className="my-2">
          <TableHeader className="bg-gray-200 dark:bg-gray-800">
            <TableRow className="font-semibold">
              <TableCell>public key (salt)</TableCell>
              <TableCell>private key (password)</TableCell>
              <TableCell>hash</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{salt}</TableCell>
              <TableCell>123</TableCell>
              <TableCell className="flex items-center justify-center text-nowrap">
                30c20a0410bccb6c846c23ce4e26bf13ad3a7dd0b4fdc49f6f81d11b26885ac5
                <CheckIcon className="mx-4 inline-block size-6 text-green-600" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{salt}</TableCell>
              <TableCell>1234</TableCell>
              <TableCell className="text-nowrap">
                3b4f722ef0094771ca3a62db7253800ff3d057c812eb7529064e3214f08ad905
                <Cross2Icon className="mx-4 inline-block size-6 text-red-600" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Heading3>鹽巴記得換新</Heading3>
        <Paragraph>
          在使用者註冊帳號或是更換密碼成功時 (牽涉到 private key
          的變更)，我們應該幫使用者更換一組新的 salt
        </Paragraph>
        <Heading2>記住使用者的登入狀態</Heading2>
        <Heading3>Session</Heading3>
        <Paragraph>
          使用者成功登入帳號後服務器可以基於使用者的資料產生 session
          並將它暫存起來，其中的 session ID 會回傳給客戶端 (通常會透過 Cookie
          存到瀏覽器內)，之後客戶端要發送請求給服務器時，服務器先檢索 session ID
          存不存在來判斷登入狀態，如果 session ID 不存在或已失效回傳 401
          狀態將客戶端重導至登入頁面中
        </Paragraph>
      </Article>
    </RootLayout>
  );
}
