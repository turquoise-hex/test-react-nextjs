import React from "react";
import styled from "styled-components";
import { Buttons } from "./buttons";

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: teal;
  border-radius: 20px;
  padding: 40px;

  & > p {
    font-size: 40px;
    color: #313131;
  }
`;

interface CounterProps {
  displayTotal: (index: number, value: number) => void;
  addCounter: (index: number) => void;
  deductCounter: (index: number) => void;
  index: number;
  initialValue: number;
}

export const Counter = ({ displayTotal, addCounter, deductCounter, index, initialValue }: CounterProps) => {
  const handleAdd = () => {
    addCounter(index);
  };

  const handleDeduct = () => {
    deductCounter(index);
  };

  return (
    <CounterContainer>
      <p>{initialValue}</p>
      <Buttons addA={handleAdd} deductA={handleDeduct} />
    </CounterContainer>
  );
};
