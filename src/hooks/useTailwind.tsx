import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/../tailwind.config';
import { useRef, useState } from 'react';

export const useTailwind = () => {
  const fullConfig = resolveConfig(tailwindConfig);
  const previousPageWidth = useRef(0);

  const updatePageWidth = (width: number) => {
    previousPageWidth.current = width;
  };

  const getScreenSizes = () => {
    const mapping: { [key: string]: number }[] = [];

    (() => {
      const {
        theme: { screens },
      } = fullConfig;

      for (const [key, val] of Object.entries(screens)) {
        const value = +val.slice(0, val.indexOf('px'));
        mapping.push({ [key]: value });
      }
    })();

    (() => {
      const { screens } = fullConfig;

      for (const [key, val] of Object.entries(screens)) {
        const value = +val.slice(0, val.indexOf('px'));
        const index = mapping.indexOf({ [key]: value });
        const isExisted = index != -1;
        if (isExisted) {
          mapping.splice(index, 1);
        }
      }
    })();

    return mapping;
  };

  const findCurrentBreakpoint = (width: number) => {
    const screens = getScreenSizes();
    let maxWidth = 0;

    for (let i = 0; i <= screens.length; i++) {
      const screen = screens[i];
      const screenName = Object.keys(screen)[0];
      const screenWidth = Object.values(screen)[0];

      if (maxWidth <= screenWidth) maxWidth = screenWidth;
      if (width >= maxWidth && width <= screenWidth) {
        return screenName;
      }
    }
  };

  return {
    getScreenSizes,
    findCurrentBreakpoint,
    previousPageWidth,
    updatePageWidth,
  };
};
