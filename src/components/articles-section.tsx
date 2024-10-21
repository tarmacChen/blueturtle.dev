import { articleProperties } from "./articleProperties";
import clsx from "clsx";
import { HeaderWithLink } from "@/article";
import moment from "moment";

const Separator = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "mx-auto my-4 w-full border-t-[1.5px] bg-gray-300",
        className,
      )}></div>
  );
};

const sortByTime = (
  a: string,
  b: string,
  sorting: "ascend" | "descend",
): number => {
  if (sorting == "ascend") return sortByTimeAscend(a, b);
  if (sorting == "descend") return sortByTimeDescend(a, b);
  return 0;
};

const sortByTimeAscend = (aTimeStamp: string, bTimeStamp: string): number => {
  const aMoment = moment(aTimeStamp);
  const bMoment = moment(bTimeStamp);

  if (aMoment.isBefore(bMoment)) return -1;
  if (aMoment.isAfter(bMoment)) return 1;
  return 0;
};

const sortByTimeDescend = (aTimeStamp: string, bTimeStamp: string): number => {
  const aMoment = moment(aTimeStamp);
  const bMoment = moment(bTimeStamp);

  if (aMoment.isBefore(bMoment)) return 1;
  if (aMoment.isAfter(bMoment)) return -1;
  return 0;
};

const ArticlesSection = () => {
  const sortedArticles = articleProperties.sort((a, b) =>
    sortByTime(a.createdTime, b.createdTime, "descend"),
  );

  return (
    <div className="flex flex-col px-2">
      {sortedArticles.map((article, index) => {
        return (
          <div key={article.href}>
            <HeaderWithLink {...article} />
            {index !== articleProperties.length - 1 ? <Separator /> : <></>}
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesSection;
