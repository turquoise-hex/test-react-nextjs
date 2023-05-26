import React from "react";
import styled from "styled-components";
import { Buttons } from "./buttons";

const CounterContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "teal",
  borderRadius: "20px",
  padding: "40px",

  "& > p": {
    fontSize: "40px",
    color: "#313131",
  },
});


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
