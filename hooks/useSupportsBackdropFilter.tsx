import { useState, useEffect } from 'react';

export function useSupportsBackdropFilter() {
  const [supports, setSupports] = useState(false);

  useEffect(() => {
    if (typeof CSS !== 'undefined') {
      const supported = CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
      setSupports(supported);
    }
  }, [])

  return supports;
}