import create from 'zustand';

type CounterState = {
  counters: number[];
  timesPressed: number;
  updateCounter: (index: number, value: number) => void;
  total: number,
  incrementTimesPressed: () => void;
  resetState: () => void;
};

const countersLength = 3;
const initialCounterValue = 1;
const initializeCounters = new Array(countersLength).fill(initialCounterValue)

export const useCounterStore = create<CounterState>((set) => ({
  counters: new Array(countersLength).fill(initialCounterValue),
  total: countersLength * initialCounterValue,
  timesPressed: 0,
  
  updateCounter: (index, value) =>
    set((state) => {
      let newCounters = [...state.counters];
      let newTotal= state.total;
      newCounters[index] > value ? newTotal -=1 : newTotal += 1;
      newCounters[index] = value;
      return { counters: newCounters, total: newTotal };
    }),
  incrementTimesPressed: () =>
    set((state) => ({ timesPressed: state.timesPressed + 1 })),
  resetState: () => set({ counters: initializeCounters, timesPressed: 0, total: countersLength * initialCounterValue }),
}));
