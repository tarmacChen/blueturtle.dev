import { RootLayout } from '@/components/RootLayout';

export default function NotFoundPage() {
  return (
    <RootLayout>
      <div className="flex h-screen w-full flex-col items-center">
        <div className="text-2xl font-bold">404</div>
        <div className="text-md">Page Not Found</div>
      </div>
    </RootLayout>
  );
}
