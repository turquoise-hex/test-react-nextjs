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

export const Home = () => {
    const [counters, setCounters] = useState([1, 1, 1]);

    const updateCounter = (index: number, value: number) => {
        const newCounters = [...counters];
        newCounters[index] = value;
        setCounters(newCounters);
    };

    const total = counters.reduce((sum, value) => sum + value, 0);

    return (
        <Wrapper>
            <div>
                <TotalContainer>
                    <p>Total: {total}</p>
                </TotalContainer>
                <CountersWrapper>
                    {counters.map((counter, index) =>
                        <Counter
                            key={index}
                            addCounter={() => updateCounter(index, counter + 1)}
                            deductCounter={() => updateCounter(index, counter - 1)}
                            value={counter}
                        />
                    )}
                </CountersWrapper>
            </div>
        </Wrapper>
    );
};

export default Home;
