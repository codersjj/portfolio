'use client'

import { useState, useLayoutEffect } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import RecentProjects from "@/components/RecentProjects";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";
import { navItems } from "@/data";
import { useTopNavStore } from "@/providers/top-navigation-store-provider";

export default function Home() {
  const setShowTopNav = useTopNavStore((state) => state.setShowTopNav);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setShowTopNav(!visible);
  };

  // Hero 渲染完成后回调
  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  // 处理页面加载时的 hash 导航
  useLayoutEffect(() => {
    if (!heroLoaded || !window.location.hash) return;

    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;

    // 使用 requestAnimationFrame 确保布局完成后执行
    let rafId: number;
    
    const scrollToTarget = () => {
      rafId = requestAnimationFrame(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    };

    scrollToTarget();

    // 清理函数
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [heroLoaded]);

  return (
    <main className="relative flex flex-col justify-start items-center mx-auto px-4 sm:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <FloatingNav navItems={navItems} onVisibleChange={handleVisibleChange} />
        <Hero onLoaded={handleHeroLoaded} />
        {heroLoaded && (
          <>
            <Grid />
            <RecentProjects />
            <Experience />
            <Approach />
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}
