import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="mx-auto flex flex-col lg:w-2/3 max-md:w-full">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
