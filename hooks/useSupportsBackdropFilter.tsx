import { useState, useEffect } from 'react';

export function useSupportsBackdropFilter() {
  const [supports, setSupports] = useState(false);

  useEffect(() => {
    // 首先检查 CSS.supports
    if (typeof CSS === 'undefined') {
      setSupports(false);
      return;
    }

    const cssSupported = CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
    
    if (!cssSupported) {
      setSupports(false);
      return;
    }

    // 检测移动端设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // 移动端进行实际渲染测试
      testBackdropFilterSupport();
    } else {
      // 桌面端直接使用 CSS.supports 结果
      setSupports(true);
    }

    function testBackdropFilterSupport() {
      try {
        // 创建测试元素
        const testDiv = document.createElement('div');
        testDiv.style.position = 'fixed';
        testDiv.style.top = '-9999px';
        testDiv.style.left = '-9999px';
        testDiv.style.width = '1px';
        testDiv.style.height = '1px';
        testDiv.style.backdropFilter = 'blur(1px)';
        // 使用类型断言处理webkit前缀
        (testDiv.style as any).webkitBackdropFilter = 'blur(1px)';
        
        document.body.appendChild(testDiv);
        
        // 检查计算样式
        const computedStyle = window.getComputedStyle(testDiv);
        const backdropFilter = computedStyle.backdropFilter || (computedStyle as any).webkitBackdropFilter;
        
        // 清理测试元素
        document.body.removeChild(testDiv);
        
        // 如果 backdrop-filter 值不是 'none'，说明支持
        const isSupported = backdropFilter && backdropFilter !== 'none';
        
        // 对于某些移动设备，即使支持也可能性能不佳，进行额外检查
        if (isSupported) {
          // 检查是否是低性能设备
          const isLowPerformance = checkLowPerformanceDevice();
          setSupports(!isLowPerformance);
        } else {
          setSupports(false);
        }
      } catch (error) {
        // 测试失败，认为不支持
        setSupports(false);
      }
    }

    function checkLowPerformanceDevice() {
      // 检查设备内存（如果可用）
      if ('deviceMemory' in navigator) {
        return (navigator as any).deviceMemory < 4; // 内存小于4GB认为是低性能设备
      }
      
      // 检查硬件并发数
      if ('hardwareConcurrency' in navigator) {
        return navigator.hardwareConcurrency < 4; // CPU核心数少于4认为是低性能设备
      }
      
      // 检查用户代理中的低端设备标识
      const lowEndDevices = /Android.*SM-[AJGN]|Android.*GT-[IP]|Android.*SHV-E|iPhone.*6|iPhone.*5|iPad.*2|iPad.*3|iPad.*4/i;
      return lowEndDevices.test((navigator as Navigator).userAgent);
    }
  }, [])

  return supports;
}