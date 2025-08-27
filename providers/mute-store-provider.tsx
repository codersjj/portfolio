'use client'

import { createContext, useRef, useContext, ReactNode, useEffect } from 'react';
import { useStore } from 'zustand';
import { createMuteStore, MuteState } from '@/stores/mute-store';

export type MuteStoreApi = ReturnType<typeof createMuteStore>;

const MuteStoreContext = createContext<MuteStoreApi | undefined>(undefined);

export function MuteStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<MuteStoreApi | null>(null);
  if (storeRef.current === null) {
    // 只在客户端初始化 localStorage
    const isMuted = typeof window !== 'undefined' ? localStorage.getItem('isMuted') === 'true' : false;
    storeRef.current = createMuteStore({ isMuted });
  }

  // 同步 localStorage
  useEffect(() => {
    const unsub = storeRef.current!.subscribe((state: MuteState) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isMuted', state.isMuted ? 'true' : 'false');
      }
    });
    return () => unsub();
  }, []);

  return (
    <MuteStoreContext.Provider value={storeRef.current}>
      {children}
    </MuteStoreContext.Provider>
  );
}

export function useMuteStore<T>(selector: (state: MuteState) => T): T {
  const store = useContext(MuteStoreContext);
  if (!store) throw new Error('useMuteStore must be used within MuteStoreProvider');
  return useStore(store, selector);
}
