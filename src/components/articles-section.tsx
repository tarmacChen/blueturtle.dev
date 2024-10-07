import moment from "moment";
import Link from "next/link";
import { ArticleProps } from "./articles";
import { articles } from "./articles";
import clsx from "clsx";

const Article = ({ title, description, href, posted }: ArticleProps) => {
  const date = moment(posted);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-semibold">
        <Link href={href}>{title}</Link>
      </h1>
      <p className="mb-2 mt-1 text-sm text-black/60 dark:text-gray-400">
        {description}
      </p>
      <div className="flex w-full justify-end text-sm text-black/60 dark:text-primary">
        <span>{date.format("ll")}</span>
      </div>
    </div>
  );
};

const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "mx-auto mt-4 w-full border-t-[1.5px] bg-gray-300",
        className,
      )}></div>
  );
};

const ArticlesSection = () => {
  return (
    <div className="my-4 flex flex-col space-y-8 px-2">
      {articles.map((article, index) => {
        return (
          <div key={article.href}>
            <Article {...article} />
            {index !== articles.length - 1 ? <Separator /> : <></>}
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesSection;
