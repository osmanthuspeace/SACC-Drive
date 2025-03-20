import { DisplayFile } from "@/types";
import { createStore } from "./createStore";

interface DisplayItemStore {
  displayItems: DisplayFile[];
  addDisplayItem: (displayItem: DisplayFile) => void;
  removeDisplayItem: (index: number) => void;
  setDisplayItems: (displayItems: DisplayFile[]) => void;
}

const useDisplayItemStore = createStore<DisplayItemStore>((set) => ({
  displayItems: [],
  addDisplayItem: (newDisplayItem: DisplayFile) =>
    set((state) => ({
      displayItems: [...state.displayItems, newDisplayItem],
    })),
  removeDisplayItem: (index: number) =>
    set((state) => ({
      displayItems: state.displayItems.filter((_, i) => i !== index),
    })),
  setDisplayItems: (displayItems: DisplayFile[]) => set({ displayItems }),
}));
export const useDisplayItems = () =>
  useDisplayItemStore((state) => state.displayItems);
export const useAddDisplayItem = () =>
  useDisplayItemStore((state) => state.addDisplayItem);
export const useRemoveDisplayItem = () =>
  useDisplayItemStore((state) => state.removeDisplayItem);
export const useSetDisplayItems = () =>
  useDisplayItemStore((state) => state.setDisplayItems);
