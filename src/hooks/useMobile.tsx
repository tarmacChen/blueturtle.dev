import { useEffect, useState } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>();
  const minDimension = 768;

  function resizeHandler() {
    setIsMobile(window.innerWidth <= minDimension);
  }

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return { isMobile };
};
