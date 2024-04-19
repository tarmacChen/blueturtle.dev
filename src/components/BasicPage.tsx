import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { useDevice } from '@/hooks/useDevice';
import { FooterSection } from '@/components/FooterSection';
import { Navbar, NavbarWithSearchBar } from '@/components/Navbar';
import { BackToTopButton } from '@/components/BackToTopButton';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export function BasicPage({
  children,
  search = '',
  dispatch,
}: {
  children: React.ReactNode;
  search?: string;
  dispatch?: Dispatch<SetStateAction<string>>;
}) {
  const [scrollY, setScrollY] = useState(0);
  const { isScrollingUp, updatePosition } = useScroll();
  const { isMobile } = useDevice();
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
    <div>
      {dispatch ? (
        <NavbarWithSearchBar
          search={search}
          dispatch={dispatch}
        />
      ) : (
        <Navbar />
      )}
      <div className="px-4 mt-4 mb-8">{children}</div>
      {backButtonVisible && (
        <BackToTopButton className="fixed bottom-16 right-4 gap-1">
          <ArrowUpIcon />
          Back to top
        </BackToTopButton>
      )}
      {isMobile && isScrollingUp && <FooterSection />}
    </div>
  );
}
