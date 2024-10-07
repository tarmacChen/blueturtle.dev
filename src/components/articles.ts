export type ArticleProps = {
  title: string;
  description: string;
  href: string;
  posted: string;
};

export const articles: ArticleProps[] = [
  {
    title: "在 MTP 協定裡透過命令列同步資料",
    description: "使用 mtpcopy",
    href: "/posts/mtp-device",
    posted: "2023-04-26T07:29:25+08:00",
  },
  {
    title: "在單純的 Windows 環境下使用 JDK 管理工具 - jabba",
    description: "不能用 SDKMAN 該怎麼辦",
    href: "/posts/jdk-jabba",
    posted: "2023-03-16T19:30:16+08:00",
  },
  {
    title: "避免注意力分散 Avoid space out",
    description: "用限制資源這個方法來約束自己處理事情時的擁有的條件",
    href: "/posts/avoid-space-out",
    posted: "2023-02-23T07:15:39+08:00",
  },
];
