import styled from "styled-components";
import React from "react";
import { Counter } from "./components/counter";
import { CounterProvider, useCounterContext } from './components/CounterContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: teal;
  border-radius: 20px;
  padding: 40px;

  & > p {
    font-size: 40px;
    color: #313131;
  }
`;

const CountersWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
`;

const Home = () => {
  const { counters, updateCounter } = useCounterContext();

  const total = counters.reduce((sum, value) => sum + value, 0);

  return (
    <Wrapper>
      <div>
        <TotalContainer>
          <p>Total: {total}</p>
        </TotalContainer>
        <CountersWrapper>
          {counters.map((counter, index) => (
            <Counter
              key={index}
              addCounter={() => updateCounter(index, counter + 1)}
              deductCounter={() => updateCounter(index, counter - 1)}
              value={counter}
            />
          ))}
        </CountersWrapper>
      </div>
    </Wrapper>
  );
};

const App = () => {
  return (
    <CounterProvider>
      <Home />
    </CounterProvider>
  );
};

export default App;
