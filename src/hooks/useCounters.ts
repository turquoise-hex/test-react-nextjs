import {
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { useMutation, useQuery } from "react-query";

export type CounterType = {
  id: string;
  value: number;
};

export const useCounters = () => {
  const {
    data: counters,
    isLoading: isLoadingCounters,
    error,
    refetch,
  } = useQuery<CounterType[], Error>("counters", async () => {
    const uid = auth.currentUser?.uid; // Get the current user's UID
    if (!uid) throw new Error("User is not authenticated");
    const countersCol = collection(db, "counters");
    const q = query(countersCol, where("owner", "==", uid)); // Only fetch counters that the current user owns
    const countersSnapshot = await getDocs(q);
    return countersSnapshot.docs.map((doc) => ({
      id: doc.id,
      value: doc.data().value,
    }));
  });

  const { mutate: updateCounters } = useMutation(
    async ({ id, value }: { id: string; value: number }) => {
      const counterRef = doc(db, "counters", id);
      await updateDoc(counterRef, { value });
      await refetch();
    }
  );

  const { mutate: deleteCounter } = useMutation(async (id: string) => {
    const counterRef = doc(db, "counters", id);
    await deleteDoc(counterRef);
    await refetch();
  });

  const { mutate: createCounter } = useMutation(
    async ({ value }: { value: number }) => {
      const uid = auth.currentUser?.uid; // Get the current user's UID
      if (!uid) throw new Error("User is not authenticated");
      const countersCol = collection(db, "counters");
      // Include owner ID while creating a counter
      const docRef = await addDoc(countersCol, { value, owner: uid });
      await refetch();
      return { id: docRef.id, value };
    }
  );

  const deductCounter = (counter: CounterType) =>
    updateCounters({ id: counter.id, value: counter.value - 1 });

  const addCounter = (counter: CounterType) =>
    updateCounters({ id: counter.id, value: counter.value + 1 });

    const counterTotal = counters?.reduce((total, counter) => total + counter.value, 0) || 0

  return {
    counters,
    updateCounters,
    deleteCounter,
    createCounter,
    deductCounter,
    addCounter,
    isLoadingCounters,
    counterTotal,
    error,
  };
};
