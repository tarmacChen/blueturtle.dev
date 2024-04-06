import { useEffect, useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { useMobile } from '@/hooks/useMobile';
import { FooterSection } from '@/components/FooterSection';
import { NavbarSection } from '@/components/NavbarSection';
import { BackToTopButton } from '@/components/BackToTopButton';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export function BasicPage({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  const { isScrollingUp, updatePosition } = useScroll();
  const { isMobile } = useMobile();
  const backButtonVisible = isScrollingUp && scrollY > window.outerHeight;

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
    <main>
      <div className="w-full mx-auto">
        <NavbarSection />
        <div className="mt-8 px-8">{children}</div>
      </div>
      {backButtonVisible && (
        <BackToTopButton className="fixed bottom-16 right-4 gap-1">
          <ArrowUpIcon />
          Back to top
        </BackToTopButton>
      )}
      {isMobile && isScrollingUp && <FooterSection />}
    </main>
  );
}
