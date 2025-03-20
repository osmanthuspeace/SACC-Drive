
import { FolderDataInBreadcrumb } from "@/types";
import { createStore } from "./createStore";

interface BreadcrumbInfo {
  breadcrumb: FolderDataInBreadcrumb[];
  addBreadcrumb: (breadcrumb: FolderDataInBreadcrumb) => void;
  removeBreadcrumb: (index: number) => void;
  clearBreadcrumb: () => void;
}

const useBreadcrumbStore = createStore<BreadcrumbInfo>(
  (set) => ({
    breadcrumb: [],
    addBreadcrumb: (newCrumb: FolderDataInBreadcrumb) =>
      set((state) => ({
        breadcrumb: [...state.breadcrumb, newCrumb],
      })),
    removeBreadcrumb: (index: number) =>
      set((state) => ({
        breadcrumb: state.breadcrumb.slice(0, index),
      })),
    clearBreadcrumb: () => set({ breadcrumb: [] }),
  }),
  {
    persistName: "breadcrumb-storage",
  }
);

export default useBreadcrumbStore;
