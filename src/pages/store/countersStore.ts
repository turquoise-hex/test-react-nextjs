import { create } from "zustand";
import { produce } from 'immer';

type CounterState = {
  counters: number[];
  countersLength: number;
  timesPressed: number;
  updateCounter: (index: number, value: number) => void;
  total: number;
  incrementTimesPressed: () => void;
  resetState: () => void;
  incrementCountersLength: () => void;
  decrementCountersLength: () => void;
};

const initialCountersLength = 3;
const initialCounterValue = 1;

export const useCounterStore = create<CounterState>((set) => ({
  counters: new Array(initialCountersLength).fill(initialCounterValue),
  countersLength: initialCountersLength,
  total: initialCountersLength * initialCounterValue,
  timesPressed: 0,

  updateCounter: (index, value) =>
    set((state) => {
      let newCounters = [...state.counters];
      let newTotal = state.total;
      newCounters[index] > value ? (newTotal -= 1) : (newTotal += 1);
      newCounters[index] = value;
      return { counters: newCounters, total: newTotal };
    }),
  incrementTimesPressed: () =>
    set((state) => ({ timesPressed: state.timesPressed + 1 })),
  resetState: () =>
    set({
      counters: new Array(initialCountersLength).fill(initialCounterValue),
      timesPressed: 0,
      total: initialCountersLength * initialCounterValue,
      countersLength: initialCountersLength,
    }),
  incrementCountersLength: () =>
    set((state) => {
      const newCounters = [...state.counters, initialCounterValue];
      return {
        counters: newCounters,
        countersLength: state.countersLength + 1,
        total: state.total + initialCounterValue,
      };
    }),
  decrementCountersLength: () =>
    set((state) => {
      if (state.countersLength > 1) {
        const newCounters = state.counters.slice(0, state.countersLength - 1);
        const decrementFromTotal = state.counters[state.counters.length-1];
        
        return {
          counters: newCounters,
          countersLength: state.countersLength - 1,
          total: state.total - decrementFromTotal};
      } return state;
    }),
}));
