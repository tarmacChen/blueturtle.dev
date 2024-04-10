import { BasicPage } from '@/components/BasicPage';

export default function NotFoundPage() {
  return (
    <BasicPage>
      <div className="flex flex-col w-full h-screen items-center">
        <div className="text-2xl font-bold">404</div>
        <div className="text-md">Page Not Found</div>
      </div>
    </BasicPage>
  );
}
