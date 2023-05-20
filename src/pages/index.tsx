import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { Counter } from "./components/counter";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
});

const TotalContainer = styled.div<{ width: number }>((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "teal",
  borderRadius: "20px",
  padding: "40px",
  width: `${props.width}px`,
  marginBottom: "20px",

  "& > p": {
    fontSize: "40px",
    color: "#313131",
  },
}));

const CountersWrapper = styled.div({
  display: "flex",
  gap: "20px",
});

export const Home = () => {
  const [counters, setCounters] = useState([1, 1, 1]);

  const updateCounter = (index: number, value: number) => {
    const newCounters = [...counters];
    newCounters[index] = value;
    setCounters(newCounters);
  };

  const total = counters.reduce((sum, value) => sum + value, 0);

  const countersWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (countersWrapperRef.current) {
      const width = countersWrapperRef.current.offsetWidth;
      setTotalContainerWidth(width);
    }
  }, []);

  const [totalContainerWidth, setTotalContainerWidth] = useState(0);

  return (
    <Wrapper>
      
      <TotalContainer width={totalContainerWidth - 2 * 40 - 2 * 20}>
        <p>Total: {total}</p>
      </TotalContainer>
      <div ref={countersWrapperRef}>
        <CountersWrapper>
          <Counter displayTotal={updateCounter} index={0} initialValue={1} />
          <Counter displayTotal={updateCounter} index={1} initialValue={1} />
          <Counter displayTotal={updateCounter} index={2} initialValue={1} />
        </CountersWrapper>
      </div>
    </Wrapper>
  );
};

export default Home;
