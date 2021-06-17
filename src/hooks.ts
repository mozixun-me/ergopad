import React, { useEffect, useRef } from 'react';
import TwoTS from 'twojs-ts';
declare class Two extends TwoTS {}

export const useTwo = <T extends HTMLElement>(
  elRef: React.RefObject<T>,
  f: (two: Two, el: T) => void,
  fDeps: React.DependencyList,
) => {
  const twoRef = useRef<Two>();
  useEffect(() => {
    const el = elRef.current;
    if (!el) {
      return;
    }

    const params = {
      width: el.clientWidth,
      height: el.clientHeight,
    };
    twoRef.current = new Two(params);
    twoRef.current.appendTo(el);
  }, []);
  useEffect(() => {
    const el = elRef.current;
    if (!el) {
      return;
    }
    if (twoRef.current) {
      return f(twoRef.current, el);
    }
  }, fDeps);
};