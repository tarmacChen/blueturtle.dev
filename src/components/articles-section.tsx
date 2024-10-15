import { articles } from "./articles";
import clsx from "clsx";
import { HeaderWithLink } from "@/article";

const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "mx-auto my-4 w-full border-t-[1.5px] bg-gray-300",
        className,
      )}></div>
  );
};

const ArticlesSection = () => {
  return (
    <div className="flex flex-col px-2">
      {articles.map((article, index) => {
        return (
          <div key={article.href}>
            <HeaderWithLink {...article} />
            {index !== articles.length - 1 ? <Separator /> : <></>}
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesSection;
