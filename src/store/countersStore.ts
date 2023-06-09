import { create } from "zustand";
import produce, { Draft } from "immer";
import { doc, getDocs, setDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

// type CounterState = {
//   counters: number[];
//   countersLength: number;
//   timesPressed: number;
//   updateCounter: (index: number, value: number) => void;
//   total: number;
//   resetState: () => void;
//   incrementCountersLength: () => void;
//   decrementCountersLength: () => void;
// };

// const initialCountersLength = 3;
// const initialCounterValue = 1;

// export const useCounterStore = create<CounterState>((set) => {
//   return {
//     counters: new Array(initialCountersLength).fill(initialCounterValue),
//     countersLength: initialCountersLength,
//     total: initialCountersLength * initialCounterValue,
//     timesPressed: 0,

//     updateCounter: (index, value) =>
//       set(
//         produce((draft: Draft<CounterState>) => {
//           const previousValue = draft.counters[index];
//           draft.counters[index] = value;
//           draft.total += value - previousValue;
//           draft.timesPressed++;
//         })
//       ),
    
//     resetState: () =>
//       set(
//         produce((draft: Draft<CounterState>) => {
//           draft.counters = new Array(initialCountersLength).fill(
//             initialCounterValue
//           );
//           draft.timesPressed = 0;
//           draft.total = initialCountersLength * initialCounterValue;
//           draft.countersLength = initialCountersLength;
//         })
//       ),
//     incrementCountersLength: () =>
//       set(
//         produce((draft: Draft<CounterState>) => {
//           if (draft.countersLength <= 5) {
//             const newCounters = [...draft.counters, initialCounterValue];
//             draft.counters = newCounters;
//             draft.countersLength += 1;
//             draft.total += initialCounterValue;
//           }
//         })
//       ),
//     decrementCountersLength: () =>
//       set(
//         produce((draft: Draft<CounterState>) => {
//           if (draft.countersLength > 1) {
//             const newCounters = draft.counters.slice(
//               0,
//               draft.countersLength - 1
//             );
//             const decrementFromTotal =
//               draft.counters[draft.counters.length - 1];
//             draft.counters = newCounters;
//             draft.countersLength -= 1;
//             draft.total -= decrementFromTotal;
//           }
//         })
//       ),
//   };
// });


export type CounterType = {
  id: string;
  value: number;
}


export const getCounters = async (): Promise<CounterType[]> => {
  const countersCol = collection(db, 'counters');
  const countersSnapshot = await getDocs(countersCol);
  return countersSnapshot.docs.map(doc => ({id: doc.id, value: doc.data().value }));
}

export const createCounterFirestore = async ({ id, value }: { id: string, value: number }) => {
  const docRef = doc(db, 'counters', id);
  await setDoc(docRef, { id, value });
  return { id, value };
};

export const updateCounterFirestore = async ({ id, value }: { id: string; value: number }) => {
  const counterRef = doc(db, 'counters', id);
  await updateDoc(counterRef, { value });
}

export const deleteCounterFirestore = async (id: string) => {
  const counterRef = doc(db, 'counters', id);
  await deleteDoc(counterRef);
}