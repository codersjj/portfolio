'use client'

import { ThemeProvider } from "@/providers/theme-provider"
import { MuteStoreProvider } from '@/providers/mute-store-provider';
import TopNavigation from "@/components/ui/TopNavigation";
import { TopNavStoreProvider, useTopNavStore } from "@/providers/top-navigation-store-provider";

function ClientLayoutInner({ children }: { children: React.ReactNode }) {
  const showTopNav = useTopNavStore((state) => state.showTopNav);
  
  return (
    <>
      {showTopNav && <TopNavigation />}
      {children}
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={true}
    >
      <MuteStoreProvider>
        <TopNavStoreProvider>
          <ClientLayoutInner>
            {children}
          </ClientLayoutInner>
        </TopNavStoreProvider>
      </MuteStoreProvider>
    </ThemeProvider>
  );
}