import styled from "styled-components";
import { Button } from "./components/Button.styled";
import { useCounterStore } from "./store/countersStore";
import { useFactsStore } from "./store/factsStore";
import { useEffect } from "react";

const Container = styled.div({
  padding: "4em",
  background: "lightblue",
  fontSize: "2em",
  textAlign: "center",
  margin: "0px",
});


const TestPage = () => {
  const { resetState, timesPressed, total} = useCounterStore();
  const { fact, fetchFacts, isLoading } = useFactsStore();

  useEffect(() => {
    fetchFacts(total);
  }, [total]);

  return (
    <Container>
      <h1>Times you changed the counters: {timesPressed}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{fact}</p>
      )}
      <Button onClick={resetState}>RESET STATE</Button>
    </Container>
  );
};

export default TestPage;
