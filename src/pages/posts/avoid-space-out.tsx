import {
  Article,
  Header,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Paragraph,
  PostTime,
  SubTitle,
} from "@/article";
import { RootLayout } from "@/components/RootLayout";

export default function Page() {
  const title = "避免注意力分散 Avoid space out";
  const description = "用限制資源這個方法來約束自己處理事情時的擁有的條件";
  const createdDate = "2023-2-23";

  return (
    <RootLayout>
      <Article>
        <Header
          title={title}
          description={description}
          timeText={createdDate}
        />
        <Heading2>前言</Heading2>
        <Paragraph>
          我經常會在處理一件事的時候用力過頭，一口氣把全部的精力投入進去，過度思考問題把事情複雜化，最後被衍生出來的更多事情淹沒然後自我放棄，這個習慣不但對我的生產力有害且挫敗的經驗長久下來會傷害我的身心健康，我想要先用`限制資源`這個方法試著不要讓我在處理事情的時候失去控制
        </Paragraph>
        <Heading2>限制資源</Heading2>
        <Paragraph>
          要不試著在每次處理事情的時候限制自己只能花30分鐘的時間處理，每個單位(30分鐘)我把它稱為一個子工作，如果這次執行子工作在資源結束時沒有處理完是正常的，如果需要很多個子工作才能完成是正常的，這就是一件事情在處理時必然會發生的過程
        </Paragraph>
        <Heading2>正向回饋</Heading2>
        <Paragraph>
          期待每次事情結束時都能拿到超過滿分的表現是沒有必要的，我要把追求完美的性格暫時先放在一邊，我要持續累積處理子工作時帶給我的感覺與回饋，好的回饋期待將它投入到下一次的子工作中，若出現不好的回饋我可以在子工作結束時做適當的調整，讓下一次的投入更順利進行
        </Paragraph>
      </Article>
    </RootLayout>
  );
}
