import { create } from 'zustand';
import produce, { Draft } from 'immer';

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

export const useCounterStore = create<CounterState>((set) => {
  return {
    counters: new Array(initialCountersLength).fill(initialCounterValue),
    countersLength: initialCountersLength,
    total: initialCountersLength * initialCounterValue,
    timesPressed: 0,

    updateCounter: (index, value) =>
  set(produce((draft: Draft<CounterState>) => {
    const previousValue = draft.counters[index];
    draft.counters[index] = value;
    draft.total += value - previousValue;
  })),
    incrementTimesPressed: () =>
      set(produce((draft: Draft<CounterState>) => {
        draft.timesPressed += 1;
      })),
    resetState: () =>
      set(produce((draft: Draft<CounterState>) => {
        draft.counters = new Array(initialCountersLength).fill(initialCounterValue);
        draft.timesPressed = 0;
        draft.total = initialCountersLength * initialCounterValue;
        draft.countersLength = initialCountersLength;
      })),
    incrementCountersLength: () =>
      set(produce((draft: Draft<CounterState>) => {
        if (draft.countersLength <= 5) {
        const newCounters = [...draft.counters, initialCounterValue];
        draft.counters = newCounters;
        draft.countersLength += 1;
        draft.total += initialCounterValue;
        }
      })),
    decrementCountersLength: () =>
      set(produce((draft: Draft<CounterState>) => {
        if (draft.countersLength > 1) {
          const newCounters = draft.counters.slice(0, draft.countersLength - 1);
          const decrementFromTotal = draft.counters[draft.counters.length - 1];
          draft.counters = newCounters;
          draft.countersLength -= 1;
          draft.total -= decrementFromTotal;
        }
      })),
  };
});
