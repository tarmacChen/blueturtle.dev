import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>blueturtle.dev</title>
        <meta charSet="utf-8"></meta>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"></meta>
      </Head>

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
