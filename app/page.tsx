'use client'

import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import { useTopNavStore } from "@/providers/top-navigation-store-provider";

export default function Home() {
  const setShowTopNav = useTopNavStore((state) => state.setShowTopNav);

  const handleVisibleChange = (visible: boolean) => {
    setShowTopNav(!visible);
  };

  return (
    <main className="relative flex flex-col justify-center items-center mx-auto px-5 sm:px-10">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} onVisibleChange={handleVisibleChange} />
        <Hero />
      </div>
    </main>
  );
}
