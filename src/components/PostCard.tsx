import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarkdownFile } from "mdman"
import moment from "moment"

export const PostCard = ({ mdFile }: { mdFile: MarkdownFile }) => {
  const meta = mdFile.metadata
  const postUrl = `/posts/${meta?.title}`
  const createdTime = moment(meta.createdTime)
  const tags = meta.tags ? meta.tags.join(", ") : ""

  const DraftBadge = () => <Badge className="bg-red-600">Draft</Badge>
  const CategoryBadge = () => <Badge>{meta.category}</Badge>

  return (
    <a href={postUrl}>
      <Card>
        <CardHeader>
          <CardTitle>{meta?.title}</CardTitle>
          <CardDescription>{tags}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>{meta?.description}</div>
            <div className="flex flex-row justify-between">
              {meta.draft ? <DraftBadge /> : <CategoryBadge />}
              <div>{createdTime.format("ll")}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
