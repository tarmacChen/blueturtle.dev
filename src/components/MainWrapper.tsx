import { NavbarSection } from '@/components/NavbarSection';

export const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full mx-auto">
      <NavbarSection />
      <div className="px-8 ">{children}</div>
    </div>
  );
};
