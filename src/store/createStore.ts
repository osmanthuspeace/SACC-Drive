import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ConfigType = {
  persistName?: string;
  storage?: Storage;
};

const createStore = <T>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>,
  config?: ConfigType
) => {
  const { persistName, storage } = config || {};

  const immerStore = immer(storeCreator);

  if (persistName) {
    return create<T>()(
      persist(immerStore, {
        name: persistName,
        storage: createJSONStorage(() => storage || sessionStorage),
      })
    );
  }

  return create<T>()(immerStore);
};

export { createStore };
