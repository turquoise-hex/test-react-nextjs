import React, { createContext, useContext, useState } from 'react';

interface CounterContextProps {
  counters: number[];
  updateCounter: (index: number, value: number) => void;
  timesPressed: number;
  updateTimesPressed: (newNumber: number) => void;
  resetState: () => void;
}

interface CounterProviderProps {
  children: React.ReactNode;
}

const CounterContext = createContext<CounterContextProps>({  
  counters: [],
  updateCounter: () => {},
  timesPressed: 0,
  updateTimesPressed: () => {},
  resetState: () => {}
});

export const CounterProvider: React.FC<CounterProviderProps> = ({ children }) => {
  const [counters, setCounters] = useState([1, 1, 1]);
  const [timesPressed, setTimesPressed] = useState(0);

  const updateCounter = (index: number, value: number) => {
    const newCounters = [...counters];
    newCounters[index] = value;
    setCounters(newCounters);
    updateTimesPressed();
  }; 

  const updateTimesPressed = () => {
    const newNum = timesPressed + 1;
    setTimesPressed(newNum);
  }

  const resetState = () => {
    setCounters([1, 1, 1]);
    setTimesPressed(0);
  };

  return (
    <CounterContext.Provider value={{ counters, updateCounter, timesPressed, updateTimesPressed, resetState }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  
  return context;
};
