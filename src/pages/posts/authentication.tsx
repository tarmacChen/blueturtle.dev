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
          <TableHeader className="bg-gray-200 dark:bg-gray-700">
            <TableRow className="">
              <TableHead className="text-foreground">Authentication</TableHead>
              <TableHead className="text-foreground">Authorization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="dark:bg-slate-200 dark:text-black">
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
          如果只是用某種方式將密碼用編碼的方式處理對於安全性是沒有幫助的，前面的
          <span className="mx-1 font-semibold">MTIz</span>
          可以透過 base64 解碼得到答案為 123，後面的
          <span className="mx-1 font-semibold">30c20a......</span>
          多了非對稱密碼學的處理必須要有 salt (public key) 及 password (private
          key) 才能知道答案
        </Paragraph>
        <Heading3 id="add-salt">在密碼上灑點鹽</Heading3>
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
          的變更)，我們應該幫使用者更換一組新的 salt
        </Paragraph>
        <Heading2>自動登入 (記住使用者的登入狀態)</Heading2>
        <Heading3>Session Token</Heading3>
        <Paragraph>
          回顧剛才
          <span className="mx-1 font-semibold underline decoration-dotted underline-offset-4 hover:cursor-pointer">
            <a href="#add-salt">替密碼撒點鹽 (salt)</a>
          </span>
          的做法，我們可以用同樣的方法實作自動登入的功能，只要在每次使用者成功登入帳號時產生一次性使用的
          public key 並將它保存到客戶端及服務器內，為了與 salt
          的功能區分開我們這次給它不同的名字叫做
          <span className="mx-1 font-semibold underline">session token</span>
          (後面直接簡稱為 token)
          ，有了這個功能後客戶端向服務器發送請求時會先詢問客戶端擁有的 token
          有沒有存在服務器內，如果存在就直接授權客戶端可以登入該帳號
        </Paragraph>
        <Blockquote>
          從剛才 token
          產生的方法來看這裡其實存在著兩個漏洞，為了讓功能更完整我們馬上來解決這些問題
        </Blockquote>
        <Heading4>限制 session token 的有效時間</Heading4>

        <Heading4>限制 session token 的可用範圍</Heading4>
      </Article>
    </RootLayout>
  );
}
