"use client";

import { createContext, useRef, useContext, ReactNode } from "react";
import { createTopNavStore, TopNavState } from "@/stores/top-navigation-store";
import { useStore } from "zustand";

export type TopNavStoreApi = ReturnType<typeof createTopNavStore>;

const TopNavStoreContext = createContext<TopNavStoreApi | undefined>(undefined);

export function TopNavStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<TopNavStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTopNavStore();
  }
  return (
    <TopNavStoreContext.Provider value={storeRef.current}>
      {children}
    </TopNavStoreContext.Provider>
  );
}

export function useTopNavStore<T>(selector: (state: TopNavState) => T): T {
  const store = useContext(TopNavStoreContext);
  if (!store) throw new Error("useTopNavStore must be used within TopNavStoreProvider");
  return useStore(store, selector);
}
