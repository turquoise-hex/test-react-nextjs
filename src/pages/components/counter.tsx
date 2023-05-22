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
    addCounter: () => void;
    deductCounter: () => void;
    value: number;
}

export const Counter = ({ addCounter, deductCounter, value }: CounterProps) => {
    return (
        <CounterContainer>
            <p>{value}</p>
            <Buttons addA={addCounter} deductA={deductCounter}/>
        </CounterContainer>
    );
};
