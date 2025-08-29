'use client'

import { FloatingNav } from "@/components/ui/floating-navbar";
import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import { useState } from "react";
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

  return (
    <main className="relative flex flex-col justify-start items-center mx-auto px-4 sm:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <FloatingNav navItems={navItems} onVisibleChange={handleVisibleChange} />
        <Hero onLoaded={handleHeroLoaded} />
        {heroLoaded && <Grid />}
      </div>
    </main>
  );
}
