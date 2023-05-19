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

export const Counter = () => {
  const [a, setA] = useState(1);

  const addA = () => {
    setA(a + 1);
  };

  const deductA = () => {
    setA(a - 1);
  };

  return (
    <CounterContainer>
      <p>{a}</p>
      <Buttons addA={addA} deductA={deductA} />
    </CounterContainer>
  );
};
