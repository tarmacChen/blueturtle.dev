import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MarkdownFile } from "@/type"

export const PostCard = ({ mdFile }: { mdFile: MarkdownFile }) => {
  const meta = mdFile.metadata
  const postUrl = `/posts/${meta?.title}`

  return (
    <a href={postUrl}>
      <Card>
        <CardHeader>
          <CardTitle>{meta?.title}</CardTitle>
          <CardDescription>{meta?.tags}</CardDescription>
        </CardHeader>
        <CardContent>{meta?.description}</CardContent>
      </Card>
    </a>
  )
}
