import { useState, useEffect } from 'react';

export function useSupportsBackdropFilter() {
  const [supports, setSupports] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let testDiv: HTMLDivElement | null = null;

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

    // 检测移动端设备和浏览器
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // 移动端需要更细致的检测
      const browserInfo = detectMobileBrowser();
      if (browserInfo.isProblematicBrowser) {
        setSupports(false);
        return;
      }
      
      // 进行实际渲染测试
      testBackdropFilterSupport();
    } else {
      // 桌面端直接使用 CSS.supports 结果
      setSupports(true);
    }

    function detectMobileBrowser() {
      const userAgent = navigator.userAgent;
      
      // 检测有问题的移动浏览器
      const problematicBrowsers = [
        // Android 系统 WebView (通常版本较老)
        /Android.*Version\/[0-9]\.[0-9].*Chrome\/[0-9]{2}\./,
        // 老版本的 Samsung Internet
        /SamsungBrowser\/[0-9]\./,
        // 一些国产浏览器的 WebView
        /Quark|UC|QQ|Sogou|Baidu|360/i,
        // 老版本的 Safari (iOS < 14)
        /iPhone.*OS (1[0-3]|[0-9])_.*Safari/,
        // 微信内置浏览器
        /MicroMessenger/i,
        // 一些 App 内嵌 WebView
        /NewsArticle|Line|KAKAOTALK|Instagram|FBAV|Twitter/i
      ];
      
      const isProblematicBrowser = problematicBrowsers.some(regex => regex.test(userAgent));
      
      // 检测已知支持良好的浏览器
      const goodBrowsers = [
        // 现代 Chrome/Chromium
        /Chrome\/([8-9][0-9]|[1-9][0-9]{2})/,
        // 现代 Firefox
        /Firefox\/([7-9][0-9]|[1-9][0-9]{2})/,
        // 现代 Safari (iOS 14+)
        /iPhone.*OS (1[4-9]|[2-9][0-9])_.*Safari/,
        // Edge
        /Edg\//
      ];
      
      const isGoodBrowser = goodBrowsers.some(regex => regex.test(userAgent));
      
      return {
        isProblematicBrowser: isProblematicBrowser && !isGoodBrowser,
        userAgent
      };
    }

    function testBackdropFilterSupport() {
      try {
        // 创建测试元素
        testDiv = document.createElement('div');
        testDiv.style.position = 'fixed';
        testDiv.style.top = '-9999px';
        testDiv.style.left = '-9999px';
        testDiv.style.width = '10px';
        testDiv.style.height = '10px';
        testDiv.style.backdropFilter = 'blur(4px)';
        (testDiv.style as any).webkitBackdropFilter = 'blur(4px)';
        
        document.body.appendChild(testDiv);
        
        // 延迟检查，确保样式已应用
        timeoutId = setTimeout(() => {
          try {
            if (!testDiv || !document.body.contains(testDiv)) {
              return; // 组件已卸载或元素已被清理
            }

            const computedStyle = window.getComputedStyle(testDiv);
            const backdropFilter = computedStyle.backdropFilter || (computedStyle as any).webkitBackdropFilter;
            
            // 清理测试元素
            if (document.body.contains(testDiv)) {
              document.body.removeChild(testDiv);
            }
            testDiv = null;
            
            // 如果 backdrop-filter 值不是 'none'，说明支持
            const isSupported = backdropFilter && backdropFilter !== 'none';
            
            if (isSupported) {
              const isLowPerformance = checkLowPerformanceDevice();
              setSupports(!isLowPerformance);
            } else {
              setSupports(false);
            }
          } catch (error) {
            setSupports(false);
          } finally {
            timeoutId = null;
          }
        }, 50);
        
      } catch (error) {
        setSupports(false);
      }
    }

    function checkLowPerformanceDevice() {
      if ('deviceMemory' in navigator) {
        return (navigator as any).deviceMemory < 4;
      }
      
      if ('hardwareConcurrency' in navigator) {
        return navigator.hardwareConcurrency < 4;
      }
      
      const lowEndDevices = /Android.*SM-[AJGN]|Android.*GT-[IP]|Android.*SHV-E|iPhone.*6|iPhone.*5|iPad.*2|iPad.*3|iPad.*4/i;
      return lowEndDevices.test((navigator as Navigator).userAgent);
    }

    // 清理函数：在组件卸载时清理定时器和测试元素
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      if (testDiv && document.body.contains(testDiv)) {
        document.body.removeChild(testDiv);
        testDiv = null;
      }
    };
  }, [])

  return supports;
}