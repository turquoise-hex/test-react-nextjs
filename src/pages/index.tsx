import styled from "styled-components";
import React from "react";
import { Counter } from "./components/counter";
import {
  CounterProvider,
  useCounterContext,
} from "./components/CounterContext";
import { motion } from "framer-motion";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  backgroundImage: 'url(public/background.jpg'
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
});

const PageContent = styled(motion.div)({
  border: "6px solid #00041f",
  borderRadius: "20px",
  padding: "20px",
})
const Home = () => {
  const { counters, updateCounter, timesPressed, resetState } =
    useCounterContext();

  const total = counters.reduce((sum, value) => sum + value, 0);

  return (
    <Wrapper>
      <PageContent
        as={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
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
          <button onClick={resetState}>RESET STATE</button>
        </BottomWrapper>
      </PageContent>
      
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
