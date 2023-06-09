import { create } from "zustand";
import { persist } from "zustand/middleware";

type HistoryEntry = {
  total: number;
  fact: string;
};

type HistoryState = {
  history: HistoryEntry[];
  addToHistory: (total: number, fact: string) => void;
  visible: boolean;
  setVisible: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      visible: false,
      addToHistory: (total, fact) =>
        set((state) => {
          const newHistoryEntry: HistoryEntry = { total, fact };
          return {
            history: [...state.history, newHistoryEntry],
          };
        }),
      setVisible: () => set((state) => ({ visible: !state.visible })),
    }),
    {
      name: "historyStorage", // unique name
    }
  )
);


