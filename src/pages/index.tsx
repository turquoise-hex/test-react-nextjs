import styled from "styled-components";
import React, { useState } from "react";
import { Counter } from "./components/counter";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TotalContainer = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: teal;
  border-radius: 20px;
  padding: 40px;
  width: ${({ width }) => `${width}px`};
  margin-bottom: 20px;

  & > p {
    font-size: 40px;
    color: #313131;
  }
`;

const CountersWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content; 
`;

export const Home = () => {
  const [counters, setCounters] = useState<[number, number, number]>([1, 1, 1]);

  const updateCounter = (index: number, value: number) => {
    const newCounters = [...counters];
    newCounters[index] = value;
    setCounters(newCounters as [number, number, number]);
  };

  const addCounter = (index: number) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters as [number, number, number]);
  };

  const deductCounter = (index: number) => {
    const newCounters = [...counters];
    newCounters[index] -= 1;
    setCounters(newCounters as [number, number, number]);
  };

  const total = counters.reduce((sum, value) => sum + value, 0);

  return (
    <Wrapper>
      <TotalContainer width={CountersWrapperWidth(counters.length)}>
        <p>Total: {total}</p>
      </TotalContainer>
      <CountersWrapper>
        <Counter displayTotal={updateCounter} addCounter={addCounter} deductCounter={deductCounter} index={0} initialValue={counters[0]} />
        <Counter displayTotal={updateCounter} addCounter={addCounter} deductCounter={deductCounter} index={1} initialValue={counters[1]} />
        <Counter displayTotal={updateCounter} addCounter={addCounter} deductCounter={deductCounter} index={2} initialValue={counters[2]} />
      </CountersWrapper>
    </Wrapper>
  );
};

export default Home;

const CountersWrapperWidth = (count: number) => {
 
  const counterWidth = 200; 
  const gapWidth = 20; 
  const totalWidth = count * counterWidth + (count - 1) * gapWidth;
  return totalWidth;
};
