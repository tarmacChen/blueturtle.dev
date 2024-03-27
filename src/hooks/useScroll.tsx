import { useRef, useState } from 'react';

export const useScroll = () => {
  const previousScrollY = useRef(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const updatePosition = (scrollY: number): any => {
    if (previousScrollY.current > scrollY) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
    previousScrollY.current = scrollY;
  };

  return { isScrollingUp, updatePosition };
};
