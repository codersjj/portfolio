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
      
      // 添加调试信息（开发环境）
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Backdrop Filter Detection:', {
          userAgent: browserInfo.userAgent,
          isProblematicBrowser: browserInfo.isProblematicBrowser,
          isGoodBrowser: browserInfo.isGoodBrowser,
          cssSupported,
          finalDecision: !browserInfo.isProblematicBrowser
        });
      }
      
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
      
      // 更严格的移动端浏览器检测
      // 对于移动端，我们默认假设不支持，除非明确是已知的好浏览器
      
      // 检测已知支持良好的浏览器（白名单方式）
      const goodMobileBrowsers = [
        // 现代 Chrome/Chromium (版本 80+)
        /Chrome\/([8-9][0-9]|[1-9][0-9]{2})/,
        // 现代 Firefox (版本 70+)
        /Firefox\/([7-9][0-9]|[1-9][0-9]{2})/,
        // 现代 Safari (iOS 14+)
        /iPhone.*OS (1[4-9]|[2-9][0-9])_.*Version\/1[4-9]\./,
        // 现代 Edge
        /Edg\/([8-9][0-9]|[1-9][0-9]{2})/,
        // 新版本 Samsung Internet (版本 10+)
        /SamsungBrowser\/(1[0-9]|[2-9][0-9])/
      ];
      
      const isGoodBrowser = goodMobileBrowsers.some(regex => regex.test(userAgent));
      
      // 如果不是已知的好浏览器，就认为有问题
      const isProblematicBrowser = !isGoodBrowser;
      
      // 额外检测一些明确有问题的浏览器
      const knownProblematicBrowsers = [
        // Android 系统默认浏览器
        /Android.*Version\/[0-9]\.[0-9].*Mobile.*Safari/,
        // 老版本的各种浏览器
        /Chrome\/[0-7][0-9]\./,
        /Firefox\/[0-6][0-9]\./,
        /SamsungBrowser\/[0-9]\./,
        // WebView 应用
        /wv\)|WebView/i,
        // 国产浏览器
        /Quark|UC|QQ|Sogou|Baidu|360|MiuiBrowser|XiaoMi/i,
        // 社交应用内置浏览器
        /MicroMessenger|WeChat|QQBrowser|Line|Instagram|FBAV|Twitter/i,
        // 其他 App 内嵌浏览器
        /NewsArticle|KAKAOTALK|Pinterest|LinkedIn/i
      ];
      
      const hasKnownProblems = knownProblematicBrowsers.some(regex => regex.test(userAgent));
      
      return {
        isProblematicBrowser: isProblematicBrowser || hasKnownProblems,
        userAgent,
        isGoodBrowser
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