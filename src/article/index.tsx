import clsx from "clsx";
import moment, { lang } from "moment";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";

type ReactNodeProps = {
  children: React.ReactNode;
  className?: string;
};

type HeaderProps = {
  title: string;
  description: string;
  timeText: string;
  className?: string;
};

export const Article = ({ children }: ReactNodeProps) => {
  return <article className={clsx("my-4 p-4")}>{children}</article>;
};

export const Heading1 = ({ className, children }: ReactNodeProps) => {
  return <h1 className={clsx("text-3xl font-bold", className)}>{children}</h1>;
};

export const Heading2 = ({ className, children }: ReactNodeProps) => {
  return (
    <h2 className={clsx("text-2xl font-semibold", className)}>{children}</h2>
  );
};

export const Heading3 = ({ className, children }: ReactNodeProps) => {
  return <h3 className={clsx("text-xl", className)}>{children}</h3>;
};

export const Heading4 = ({ className, children }: ReactNodeProps) => {
  return <h4 className={clsx("text-lg", className)}>{children}</h4>;
};

export const Heading5 = ({ className, children }: ReactNodeProps) => {
  return <h5 className={clsx("", className)}>{children}</h5>;
};

export const Heading6 = ({ className, children }: ReactNodeProps) => {
  return <h6 className={clsx("", className)}>{children}</h6>;
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

export const SubTitle = ({ className, children }: ReactNodeProps) => {
  return <span className={clsx("text-primary/80", className)}>{children}</span>;
};

export const Header = ({ title, description, timeText }: HeaderProps) => {
  return (
    <section>
      <Heading1>{title}</Heading1>
      <SubTitle>{description}</SubTitle>
      <PostTime timeText={timeText} />
    </section>
  );
};

export const Paragraph = ({ className, children }: ReactNodeProps) => {
  return (
    <p className={clsx("my-8 text-lg leading-loose", className)}>{children}</p>
  );
};

export const Blockquote = ({ className, children }: ReactNodeProps) => {
  return (
    <div className="my-8 flex bg-slate-200 dark:bg-gray-700 dark:text-white">
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
  className,
  children,
  src,
}: ReactNodeProps & { src: string }) => {
  return (
    <a
      className={clsx(
        "mx-2 text-blue-700 underline underline-offset-4 dark:text-blue-400",
        className,
      )}
      href={src}>
      {children}
    </a>
  );
};

export const CodeBlock = ({
  language,
  props,
  children,
}: SyntaxHighlighterProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const iconSize = 18;
  const code = "\n" + children.toString();
  const lang = language || "";
  const codeLanguage =
    lang?.charAt(0).toUpperCase() + lang?.substring(1, lang.length);

  return (
    <CopyToClipboard
      text={children.toString()}
      onCopy={() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }}>
      <div className="relative w-full">
        <SyntaxHighlighter
          language={language}
          {...props}>
          {code}
        </SyntaxHighlighter>
        <span className="absolute left-2 top-2 text-sm text-primary/80">
          {codeLanguage}
        </span>
        <button className="absolute right-2 top-2 rounded-lg bg-gray-200 px-2 py-1">
          {isCopied ? (
            <CheckIcon
              height={iconSize}
              width={iconSize}
            />
          ) : (
            <ClipboardIcon
              height={iconSize}
              width={iconSize}
            />
          )}
        </button>
      </div>
    </CopyToClipboard>
  );
};
