import { create } from "zustand";

interface AppCommandState {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
}
const useAppCommand = create<AppCommandState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (value) => set(() => ({ isOpen: value })),
}));

export default useAppCommand;
