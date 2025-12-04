'use client'

import { ThemeProvider } from "@/providers/theme-provider"
import { MuteStoreProvider } from '@/providers/mute-store-provider';
import TopNavigation from "@/components/ui/TopNavigation";
import { TopNavStoreProvider, useTopNavStore } from "@/providers/top-navigation-store-provider";
import { usePathname } from "next/navigation";

function ClientLayoutInner({ children }: { children: React.ReactNode }) {
  const showTopNav = useTopNavStore((state) => state.showTopNav);
  const pathname = usePathname();
  const isSjzPage = pathname?.startsWith('/sjz');

  return (
    <>
      {showTopNav && !isSjzPage && <TopNavigation />}
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