import { useState, useEffect } from 'react';

export function useTouch() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - IE specific
        navigator.msMaxTouchPoints > 0
      );
      
      // 也检查设备宽度，因为有些笔记本电脑有触摸屏但应该按桌面处理
      const isMobileWidth = window.innerWidth <= 768;
      
      setIsTouchDevice(hasTouch && isMobileWidth);
    };

    checkTouch();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkTouch);
    
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  return isTouchDevice;
}

export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = useTouch();

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
    }
  };

  return {
    isHovered: isTouchDevice ? false : isHovered,
    handleMouseEnter,
    handleMouseLeave,
    isTouchDevice
  };
}
