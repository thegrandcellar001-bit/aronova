import { store } from "./store";

export const waitForRehydration = (): Promise<void> => {
  return new Promise((resolve) => {
    const state = store.getState() as any;

    // Already rehydrated?
    if (state._persist?.rehydrated) {
      resolve();
      return;
    }

    const unsubscribe = store.subscribe(() => {
      const rehydrated = (store.getState() as any)._persist?.rehydrated;
      if (rehydrated) {
        unsubscribe();
        resolve();
      }
    });
  });
};
