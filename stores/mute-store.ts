import { createStore } from 'zustand/vanilla';

export type MuteState = {
  isMuted: boolean;
  setMuted: (muted: boolean) => void;
};

export const defaultMuteState: MuteState = {
  isMuted: false,
  setMuted: () => {},
};

export const createMuteStore = (initState: Partial<MuteState> = {}) => {
  return createStore<MuteState>()((set) => ({
    isMuted: false,
    setMuted: (muted: boolean) => {
      set({ isMuted: muted });
    },
    ...initState,
  }));
};
