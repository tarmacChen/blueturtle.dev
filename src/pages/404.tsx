import { BasicPage } from '@/components/BasicPage';

export default function NotFoundPage() {
  return (
    <BasicPage>
      <div className="flex h-screen w-full flex-col items-center">
        <div className="text-2xl font-bold">404</div>
        <div className="text-md">Page Not Found</div>
      </div>
    </BasicPage>
  );
}
