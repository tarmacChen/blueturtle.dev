import { useEffect, useState } from 'react';

export const useDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const minDimension = 768;

  function resizeHandler() {
    setIsMobile(window.innerWidth <= minDimension);
  }

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return { isMobile, isDarkMode };
};
