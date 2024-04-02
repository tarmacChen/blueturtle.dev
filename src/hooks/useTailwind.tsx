import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/../tailwind.config';
import { useEffect, useRef, useState } from 'react';

export const useTailwind = () => {
  const fullConfig = resolveConfig(tailwindConfig);
  const innerWidth = useRef(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('');

  const resizeHandler = () => {
    innerWidth.current = window.innerWidth;
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const getScreenSizes = () => {
    const mapping: { [key: string]: number } = {};

    (() => {
      const {
        theme: { screens },
      } = fullConfig;

      for (const [key, val] of Object.entries(screens)) {
        const value = +val.slice(0, val.indexOf('px'));
        mapping[key] = value;
      }
    })();

    (() => {
      const { screens } = fullConfig;

      for (const [key, val] of Object.entries(screens)) {
        const value = +val.slice(0, val.indexOf('px'));
        if (mapping[key]) {
          mapping[key] = value;
        }
      }
    })();

    return mapping;
  };

  return { currentBreakpoint, getScreenSizes };
};
