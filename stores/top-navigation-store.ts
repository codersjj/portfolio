import { createStore } from "zustand/vanilla";

export type TopNavState = {
  showTopNav: boolean;
  setShowTopNav: (show: boolean) => void;
};

export const defaultTopNavState: TopNavState = {
  showTopNav: true,
  setShowTopNav: () => {},
};

export const createTopNavStore = (
  initState: Partial<TopNavState> = {}
) => {
  return createStore<TopNavState>()((set) => ({
    showTopNav: initState.showTopNav ?? true,
    setShowTopNav: (show) => set({ showTopNav: show }),
  }));
};
