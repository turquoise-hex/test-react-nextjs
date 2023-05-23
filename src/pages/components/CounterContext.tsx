import React, { createContext, useContext, useState } from 'react';

interface CounterContextProps {
  counters: number[];
  updateCounter: (index: number, value: number) => void;
}

interface CounterProviderProps {
  children: React.ReactNode;
}

const CounterContext = createContext<CounterContextProps>({  
  counters: [],
  updateCounter: () => {},
});

export const CounterProvider: React.FC<CounterProviderProps> = ({ children }) => {
  const [counters, setCounters] = useState([1, 1, 1]);

  const updateCounter = (index: number, value: number) => {
    const newCounters = [...counters];
    newCounters[index] = value;
    setCounters(newCounters);
  };

  return (
    <CounterContext.Provider value={{ counters, updateCounter }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  
  return context;
};