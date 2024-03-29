import { FooterSection } from '@/components/FooterSection';
import { MainWrapper } from '@/components/MainWrapper';
import { useMobile } from '@/hooks/useMobile';
import { useScroll } from '@/hooks/useScroll';
import { useEffect, useState } from 'react';

export default function ContactPage() {
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
      <MainWrapper>
        <div>Contact</div>
      </MainWrapper>
      {isMobile && isScrollingUp && <FooterSection />}
    </>
  );
}
