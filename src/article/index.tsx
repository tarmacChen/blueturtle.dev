import clsx from "clsx";
import moment from "moment";
import React, { AnchorHTMLAttributes, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type ClassNodeProps = {
  children: React.ReactNode;
  className?: string;
};

type HeaderProps = {
  title: string;
  href?: string;
  description: string;
  posted: string;
  className?: string;
};

export const Article = ({ children }: ClassNodeProps) => {
  return <article className={clsx("my-2 px-2")}>{children}</article>;
};

export const Heading1 = ({ className, children }: ClassNodeProps) => {
  return (
    <h1 className={clsx("my-2 text-2xl font-semibold", className)}>
      {children}
    </h1>
  );
};

export const Heading2 = ({ className, children }: ClassNodeProps) => {
  return (
    <h2 className={clsx("my-4 text-xl font-semibold", className)}>
      {children}
    </h2>
  );
};

export const Heading3 = ({ className, children }: ClassNodeProps) => {
  return (
    <h3 className={clsx("my-4 text-lg font-semibold", className)}>
      {children}
    </h3>
  );
};

export const Heading4 = ({ className, children }: ClassNodeProps) => {
  return <h4 className={clsx("text-md my-2", className)}>{children}</h4>;
};

export const Heading5 = ({ className, children }: ClassNodeProps) => {
  return <h5 className={clsx("my-2", className)}>{children}</h5>;
};

export const Heading6 = ({ className, children }: ClassNodeProps) => {
  return <h6 className={clsx("my-2", className)}>{children}</h6>;
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

export const Subheading = ({ className, children }: ClassNodeProps) => {
  return <span className={clsx("text-primary/80", className)}>{children}</span>;
};

export const Header = ({ title, description, posted, href }: HeaderProps) => {
  return (
    <section>
      <Heading1>{href ? <Link href={href}>{title}</Link> : title}</Heading1>
      <Subheading>{description}</Subheading>
      <PostTime timeText={posted} />
    </section>
  );
};

export const Paragraph = ({ className, children }: ClassNodeProps) => {
  return (
    <p className={clsx("text-md my-2 text-wrap leading-8", className)}>
      {children}
    </p>
  );
};

export const Blockquote = ({ className, children }: ClassNodeProps) => {
  return (
    <div className="my-4 flex bg-slate-200 leading-loose dark:bg-gray-700 dark:text-white">
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
}: AnchorHTMLAttributes<HTMLAnchorElement> & ClassNodeProps) => {
  return (
    <a
      className={clsx(
        "mx-1 text-blue-700 underline underline-offset-4 hover:bg-blue-100 dark:text-blue-400",
        className,
      )}
      {...props}>
      {children}
    </a>
  );
};

export const CodeBlock = ({
  showLanguageName: showLanguage,
  ...props
}: SyntaxHighlighterProps & { showLanguageName?: boolean }) => {
  const [isCopied, setIsCopied] = useState(false);
  const iconSize = 18;
  const code = (showLanguage ? "\n" : "") + props.children.toString();
  const lang = props.language || "";
  const languageName =
    lang?.charAt(0).toUpperCase() + lang?.substring(1, lang.length);

  return (
    <CopyToClipboard
      text={props.children.toString()}
      onCopy={() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }}>
      <div className="relative mb-6 mt-2 w-full text-sm">
        <SyntaxHighlighter {...props}>{code}</SyntaxHighlighter>
        <span className="absolute left-2 top-2 text-sm text-primary/50">
          {showLanguage ? languageName : ""}
        </span>
        <button className="absolute right-2 top-2 rounded-lg bg-gray-200 px-2 py-1 text-black hover:bg-gray-300">
          {isCopied ? (
            <CheckIcon
              height={iconSize}
              width={iconSize}
            />
          ) : (
            <ClipboardIcon
              height={iconSize}
              width={iconSize}
              className=""
            />
          )}
        </button>
      </div>
    </CopyToClipboard>
  );
};

export const Emphasis = ({ className, children }: ClassNodeProps) => {
  return (
    <span
      className={clsx(
        "mx-1 rounded-md bg-gray-700 px-1 py-1 text-white dark:bg-gray-800 dark:text-green-400",
        className,
      )}>
      {children}
    </span>
  );
};

export const ListItems = ({
  children,
  className,
  title,
}: ClassNodeProps & { title?: string }) => {
  return (
    <div className="my-4">
      <p className="my-2">{title}：</p>
      <ul className={clsx("list-inside list-decimal pl-4", className)}>
        {children}
      </ul>
    </div>
  );
};
