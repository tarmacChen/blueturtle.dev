import { MarkdownFile } from 'mdman';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DraftBadge } from '@/components/PostCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon, LayersIcon } from '@radix-ui/react-icons';

const SourceButton = ({ url }: { url: string }) => (
  <Link
    href={url}
    target="_blank">
    <Button className="flex flex-row rounded-md gap-2">
      Source
      <ExternalLinkIcon />
    </Button>
  </Link>
);

const DemoButton = ({ url }: { url: string }) => (
  <Link
    href={url}
    target="_blank">
    <Button className="flex flex-row rounded-md gap-2">
      Demo
      <LayersIcon />
    </Button>
  </Link>
);

export const ProjectCard = ({ md }: { md: MarkdownFile }) => {
  return (
    <Card className="w-64 border-gray-500 dark:bg-gray-800 dark:hover:border-blue-500 bg-gray-50 hover:bg-blue-50 dark:border-white">
      <CardHeader className="h-2/3">
        <div className="flex flex-row gap-2 justify-between">
          <CardTitle>{md.metadata.title}</CardTitle>
          {md.metadata.draft && <DraftBadge />}
        </div>
        <CardDescription>{md.metadata.description}</CardDescription>
        <CardContent></CardContent>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-row gap-2">
          {md.metadata.sourceUrl && (
            <SourceButton url={md.metadata.sourceUrl} />
          )}
          {md.metadata.demoUrl && <DemoButton url={md.metadata.demoUrl} />}
        </div>
      </CardFooter>
    </Card>
  );
};
