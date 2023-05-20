import styled from "styled-components";
import React, { useState } from "react";
import { Counter } from "./components/counter";

const Wrapper = styled.div({
  display: "flex",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
});

export const Home = () => {
  const [counters, setCounters] = useState([1, 1, 1]);

  const updateCounter = (index: number, value: number) => {
    const newCounters = [...counters];
    newCounters[index] = value;
    setCounters(newCounters);
  };

  const total = counters.reduce((sum, value) => sum + value, 0); 
  return (
    <div>
      <Wrapper>
        <Counter displayTotal={updateCounter} index={0} initialValue={1} /> 
        <Counter displayTotal={updateCounter} index={1} initialValue={1} /> 
        <Counter displayTotal={updateCounter} index={2} initialValue={1} />
      </Wrapper>
      <p>Total: {total}</p> 
    </div>
  );
};

export default Home;
