import { useEffect, useRef, useState } from 'react';

export const useScrollPosition = () => {
  const scrollPosition = useRef(0);

  const updatePosition = () => {
    scrollPosition.current = window.scrollY;
    // console.log(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return scrollPosition;
};
