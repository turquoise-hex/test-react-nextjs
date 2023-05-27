import styled from "styled-components";
import React from "react";
import { Counter } from "./components/counter";
import { useCounterContext } from "./components/CounterContext";
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
  background: `url(/background.jpg) no-repeat center center fixed`
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
  background: "teal",
  borderRadius: "20px",
  padding: "40px",
  opacity: "0.84",
  fontSize: "24px",
  "& > p": {
    fontSize: "40px",
    color: "#313131",
  },
});

const CountersWrapper = styled.div({
  display: "flex",
  marginTop: "20px",
  gap: "20px",
  opacity: "0.84"
});

const PageContent = styled(motion.div)({
  // background: "#1e5b95",
  // border: "6px solid #00041f",
  borderRadius: "20px",
  padding: "20px",
});

const StyledLink = styled.h1({
  display: "inline-block",
  padding: "10px 20px",
  border: "2px solid black",
  cursor: "pointer",
  backgroundColor: "lightgray",
  color: "black",
  borderRadius: "4px",
  textDecoration: "none",
  transition: "background-color 0.3s ease",
  '&:hover': {
    backgroundColor: "gray",
    color: "white",
  }
});

const Home = () => {
  const { counters, updateCounter, timesPressed, resetState } = useCounterContext();

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
              addCounter={() => updateCounter(index, counter + 1)}
              deductCounter={() => updateCounter(index, counter - 1)}
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
