import moment from "moment";
import Link from "next/link";
import { ArticleProps } from "./articles";
import { articles } from "./articles";

const Article = ({ title, description, href, posted }: ArticleProps) => {
  const date = moment(posted);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">
        <Link href={href}>{title}</Link>
      </h1>
      <p className="text-md mb-4 mt-2 text-black/60 dark:text-gray-400">
        {description}
      </p>
      <div className="flex w-full justify-end text-sm text-black/60 dark:text-primary">
        <span>{date.format("ll")}</span>
      </div>
    </div>
  );
};

const Separator = () => {
  return <div className="mx-auto w-full border-t-[1.5px] bg-gray-300"></div>;
};

const ArticlesSection = () => {
  return (
    <div className="my-4 flex flex-col space-y-8 px-2">
      {articles.map((article, index) => {
        return (
          <>
            <Article
              {...article}
              key={article.href}
            />
            {index !== articles.length - 1 ? <Separator key={index} /> : <></>}
          </>
        );
      })}
    </div>
  );
};

export default ArticlesSection;
