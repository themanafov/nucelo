import { create } from "zustand";

interface NavigationState {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
}
const useNavigation = create<NavigationState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (value) => set(() => ({ isOpen: value })),
}));

export default useNavigation;
