import React from "react";
import styled from "styled-components";
import { Buttons } from "./buttons";
import { Button } from "./Button.styled";

const CounterContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#222",
  borderRadius: "8px",
  padding: "20px",
  margin: "10px",
  color: "#fff",
});

const CounterValue = styled.p({
  fontSize: "40px",
  marginBottom: "10px",
});

const CounterId = styled.p({
  fontSize: "20px",
  marginBottom: "10px",
  color: "rgba(255, 255, 255, 0.7)", 
});

interface CounterProps {
  id: string;
  addCounter: () => void;
  deductCounter: () => void;
  value: number;
  deleteCounter: () => void;
}


export const Counter = ({id, addCounter, deductCounter, value, deleteCounter } : CounterProps) => {
  return (
    <CounterContainer>
      {/* <CounterId>ID: {id}</CounterId> */}
      <CounterValue>{value}</CounterValue>
      <Buttons addA={addCounter} deductA={deductCounter} />
      <Button onClick={deleteCounter}>DELETE COUNTER</Button>
    </CounterContainer>
  );
};