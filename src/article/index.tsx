import clsx from "clsx";
import moment from "moment";
import React, { AnchorHTMLAttributes, HTMLAttributes, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { docco, a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useTheme } from "next-themes";
import { ArticleProp } from "@/components/articleProperties";

export const Article = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <article
      className={clsx(className, "my-2 px-2")}
      {...props}>
      {children}
    </article>
  );
};

export const Heading1 = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={clsx("my-2 text-2xl font-semibold", className)}
      {...props}>
      {children}
    </h1>
  );
};

export const Heading2 = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={clsx("mb-4 mt-8 text-xl font-semibold", className)}
      {...props}>
      {children}
    </h2>
  );
};

export const Heading3 = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={clsx("mb-4 mt-8 text-lg font-semibold", className)}
      {...props}>
      {children}
    </h3>
  );
};

export const Heading4 = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h4
      className={clsx("text-md mb-4 mt-8 font-semibold", className)}
      {...props}>
      {children}
    </h4>
  );
};

export const Heading5 = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h5
      className={clsx("my-2", className)}
      {...props}>
      {children}
    </h5>
  );
};

export const Heading6 = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h6
      className={clsx("my-2", className)}
      {...props}>
      {children}
    </h6>
  );
};

export const PostTime = ({
  className,
  timeText,
}: {
  className?: string;
  timeText: string;
}) => {
  const time = moment(timeText);

  return (
    <div className="flex justify-end">
      <span className={clsx("text-sm text-primary/60", className)}>
        {time.format("ll")}
      </span>
    </div>
  );
};

export const Subheading = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <span
      className={clsx("text-primary/80", className)}
      {...props}>
      {children}
    </span>
  );
};

export const Header = ({
  title,
  description,
  createdTime,
}: ArticleProp & { className?: string }) => {
  return (
    <section>
      <Heading1>{title}</Heading1>
      <Subheading>{description}</Subheading>
      <PostTime timeText={createdTime} />
    </section>
  );
};

export const HeaderWithLink = ({
  title,
  description,
  createdTime,
  href,
}: ArticleProp) => {
  return (
    <section className="">
      <Heading1>
        <Link
          href={href || ""}
          className="underline-offset-4 hover:underline">
          {title}
        </Link>
      </Heading1>
      <Subheading>{description}</Subheading>
      <PostTime timeText={createdTime} />
    </section>
  );
};

export const Paragraph = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={clsx("text-md my-2 text-wrap leading-8", className)}
      {...props}>
      {children}
    </p>
  );
};

export const Blockquote = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <div
      className="my-4 flex bg-slate-200 leading-loose dark:bg-gray-700 dark:text-white"
      {...props}>
      <div className="w-2 bg-black text-black dark:bg-green-400 dark:text-green-400">
        *
      </div>
      <blockquote className={clsx("mx-4 py-4", className)}>
        {children}
      </blockquote>
    </div>
  );
};

export const Hyperlink = ({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className={clsx(
        "mx-1 text-blue-700 underline underline-offset-4 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-background dark:hover:text-blue-600",
        className,
      )}
      {...props}>
      {children}
    </a>
  );
};

export const CodeBlock = ({
  showLanguageName: showLanguage,
  specificLanguageName,
  ...props
}: SyntaxHighlighterProps & {
  specificLanguageName?: string;
  showLanguageName?: boolean;
}) => {
  const { resolvedTheme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  const iconSize = 18;
  const code = props.children.toString();
  const lang = props.language || "";
  const languageName =
    lang?.charAt(0).toUpperCase() + lang?.substring(1, lang.length);
  const lightStyle = docco;
  const darkStyle = a11yDark;
  const style = resolvedTheme === "dark" ? darkStyle : lightStyle;

  return (
    <div className="mb-6 mt-2 w-full text-sm">
      <div className="flex h-8 w-full items-center justify-between">
        <span className="text-primary/80">
          {showLanguage
            ? specificLanguageName === undefined
              ? languageName
              : specificLanguageName
            : ""}
        </span>
        <CopyToClipboard
          text={props.children.toString()}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 2000);
          }}>
          <button className="rounded-lg bg-gray-200 px-2 py-1 text-black hover:bg-gray-300">
            {isCopied ? (
              <CheckIcon
                height={iconSize}
                width={iconSize}
                className="animate-bounce"
              />
            ) : (
              <ClipboardIcon
                height={iconSize}
                width={iconSize}
                className=""
              />
            )}
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        style={style}
        {...props}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export const Emphasis = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <span
      className={clsx(
        "mx-1 rounded-md bg-sky-600 px-1 py-1 text-white dark:bg-gray-800 dark:text-green-400",
        className,
      )}
      {...props}>
      {children}
    </span>
  );
};

export const ListItems = ({
  children,
  className,
  title,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { title?: string }) => {
  return (
    <div
      className="my-4"
      {...props}>
      {title !== undefined ? <p className="my-2">{title}：</p> : <></>}
      <ul className={clsx("list-inside list-decimal pl-4", className)}>
        {children}
      </ul>
    </div>
  );
};
