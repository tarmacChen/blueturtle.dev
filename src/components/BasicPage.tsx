/**/ import { useEffect, useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { Navbar } from '@/components/Navbar';
import { BackToTopButton } from '@/components/BackToTopButton';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export function BasicPage({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  const { isScrollingUp, updatePosition } = useScroll();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  return (
    <div className="mx-auto w-full px-4 2xl:w-1/2">
      <Navbar />
      <main className="mb-16">{children}</main>
      {backButtonVisible && (
        <BackToTopButton className="fixed bottom-8 right-12 gap-1 hover:bg-foreground hover:opacity-100">
          <ArrowUpIcon />
          Back to top
        </BackToTopButton>
      )}
      {/* {isMobile && isScrollingUp && <FooterSection />} */}
    </div>
  );
}
