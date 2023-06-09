import { create } from "zustand";
import axios from "axios";

type FactsState = {
    fact: string;
    isLoading: boolean;
    fetchFacts: (total: number) => Promise<void>;
  };
  
  export const useFactsStore = create<FactsState>((set) => ({
    fact: '',
    isLoading: false,
    fetchFacts: async (total) => {
      set({ isLoading: true });
      try {
        const response = await axios.get(`http://numbersapi.com/${total}/year`);
        set({ fact: response.data, isLoading: false });
      } catch (error) {
        console.error('There was an error!', error);
        set({ isLoading: false });
      }
    },
  }));