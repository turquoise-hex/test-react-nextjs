// import { create } from "zustand";
// import produce, { Draft } from "immer";
import { doc, getDocs, setDoc, updateDoc, deleteDoc, collection, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';


export type CounterType = {
  id: string;
  value: number;
}


export const getCounters = async (): Promise<CounterType[]> => {
  const uid = auth.currentUser?.uid; // Get the current user's UID
  if (!uid) throw new Error('User is not authenticated');
  const countersCol = collection(db, 'counters');
  const q = query(countersCol, where("owner", "==", uid)); // Only fetch counters that the current user owns
  const countersSnapshot = await getDocs(q);
  return countersSnapshot.docs.map(doc => ({id: doc.id, value: doc.data().value }));
}

export const createCounterFirestore = async ({ id, value }: { id: string, value: number }) => {
  const uid = auth.currentUser?.uid; // Get the current user's UID
  if (!uid) throw new Error('User is not authenticated');
  const docRef = doc(db, 'counters', id);
  await setDoc(docRef, { id, value, owner: uid }); // Include the owner field when creating a counter
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
