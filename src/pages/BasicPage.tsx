import { useEffect, useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { useMobile } from '@/hooks/useMobile';
import { FooterSection } from '@/components/FooterSection';
import { NavbarSection } from '@/components/NavbarSection';

export function BasicPage({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  const { isScrollingUp, updatePosition } = useScroll();
  const { isMobile } = useMobile();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    updatePosition(scrollY);
  }, [scrollY]);

  return (
    <>
      <div className="w-full mx-auto">
        <NavbarSection />
        <div className="mt-8 px-8">{children}</div>
      </div>
      {isMobile && isScrollingUp && <FooterSection />}
    </>
  );
}
