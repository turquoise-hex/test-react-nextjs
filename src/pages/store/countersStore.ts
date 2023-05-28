import create from 'zustand';

type CounterState = {
  counters: number[];
  timesPressed: number;
  updateCounter: (index: number, value: number) => void;
  incrementTimesPressed: () => void;
  resetState: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  counters: [1, 1, 1],
  timesPressed: 0,
  updateCounter: (index, value) =>
    set((state) => {
      let newCounters = [...state.counters];
      newCounters[index] = value;
      return { counters: newCounters };
    }),
  incrementTimesPressed: () =>
    set((state) => ({ timesPressed: state.timesPressed + 1 })),
  resetState: () => set({ counters: [1, 1, 1], timesPressed: 0 }),
}));
