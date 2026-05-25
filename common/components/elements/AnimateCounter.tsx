"use client";

import { HTMLProps, useEffect, useRef } from "react";

interface AnimateCounterProps extends HTMLProps<HTMLSpanElement> {
  total: number;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const AnimateCounter = ({ total, ...rest }: AnimateCounterProps) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const formatter = new Intl.NumberFormat("id-ID");
    const duration = 1000;
    const startTime = performance.now();
    let rafId: number;

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(easeOut(progress) * total);

      if (countRef.current) {
        countRef.current.textContent = formatter.format(value);
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      }
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [total]);

  return <span {...rest} ref={countRef} />;
};

export default AnimateCounter;
