import { create } from 'zustand'


interface BearState {
    bears: number;
    setUser: () => void;
    cleanUser: () => void;
  }

const initData = {

}
export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  setUser: () => set((state) => ({ bears: state.bears + 1 })),
  cleanUser: () => set({ bears: 0 }),
}))