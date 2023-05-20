import { useState } from "react";
import styled from "styled-components";
import { Buttons } from "./buttons";

const CounterContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "teal",
  borderRadius: 20,
  padding: 40,

  "& > p": {
    fontSize: 40,
    color: "#313131",
  },
});

interface CounterProps {
  displayTotal: (index: number, value: number) => void; 
  index: number; 
  initialValue: number; 
}

export const Counter = ({ displayTotal, index, initialValue }: CounterProps) => {
  const [a, setA] = useState(initialValue);

  const addA = () => {
    setA(a + 1);
    displayTotal(index, a + 1); 
  };

  const deductA = () => {
    setA(a - 1);
    displayTotal(index, a - 1); 
  };

  return (
    <CounterContainer>
      <p>{a}</p>
      <Buttons addA={addA} deductA={deductA} />
    </CounterContainer>
  );
};
