import React from "react";
import styled from "styled-components";
import { Buttons } from "./buttons";

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #222;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  color: #fff;
`;

const CounterValue = styled.p`
  font-size: 40px;
  margin-bottom: 10px;
`;

interface CounterProps {
  addCounter: () => void;
  deductCounter: () => void;
  value: number;
}

export const Counter = ({ addCounter, deductCounter, value }: CounterProps) => {
  return (
    <CounterContainer>
      <CounterValue>{value}</CounterValue>
      <Buttons addA={addCounter} deductA={deductCounter} />
      
    </CounterContainer>
  );
};
