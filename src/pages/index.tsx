import styled from "styled-components";
import React from "react";
import { Counter } from "./components/counter";
import { useCounterStore } from "./store/countersStore";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from "./components/Button.styled";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  color: "black",
  background: `url(/background.jpg) no-repeat center center fixed`,
});

const BottomWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const TotalContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  padding: "40px",
  fontSize: "24px",
  fontWeight: "bold", 
  background: "#222",
  color: "#fff",
  "& > p": {
    fontSize: "40px",
    color: "color: #fff",
  },
});

const CountersWrapper = styled.div({
  display: "flex",
  marginTop: "20px",
  gap: "20px",
});

const PageContent = styled(motion.div)({
  borderRadius: "20px",
  padding: "20px",
});

const StyledLink = styled.h1({
  display: "inline-block",
  padding: "10px 20px",
  border: "2px solid #000",
  cursor: "pointer",
  backgroundColor: "#ddd",
  color: "#000",
  borderRadius: "4px",
  textDecoration: "none",
  transition: "background-color 0.3s ease",
  '&:hover': {
    backgroundColor: "#aaa",
    color: "#fff",
  }
});

const Home = () => {
  const counters = useCounterStore((state) => state.counters);
  const timesPressed = useCounterStore((state) => state.timesPressed);
  const updateCounter = useCounterStore((state) => state.updateCounter);
  const incrementTimesPressed = useCounterStore((state) => state.incrementTimesPressed);
  const resetState = useCounterStore((state) => state.resetState);

  const total = counters.reduce((sum, value) => sum + value, 0);

  return (
    <Wrapper>
      <PageContent
        as={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <TotalContainer>
          <p>Total: {total}</p>
        </TotalContainer>
        <CountersWrapper>
          {counters.map((counter, index) => (
            <Counter
              key={index}
              addCounter={() => {
                updateCounter(index, counter + 1);
                incrementTimesPressed();
              }}
              deductCounter={() => {
                updateCounter(index, counter - 1);
                incrementTimesPressed();
              }}
              value={counter}
            />
          ))}
        </CountersWrapper>
        <BottomWrapper>
          <p></p>
          <h1>TIMES PRESSED: {timesPressed}</h1>
          <Button onClick={resetState}>RESET STATE</Button>
          <p></p>
          <Link href="/test">
            <StyledLink>GO TO NEXT PAGE</StyledLink>
          </Link>
        </BottomWrapper>
      </PageContent>
    </Wrapper>
  );
};

export default Home;
