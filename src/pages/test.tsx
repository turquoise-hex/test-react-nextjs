import styled from "styled-components";
import { Button } from "./components/Button.styled";
import { useCounterContext } from "./components/CounterContext";

const Container = styled.div({
  padding: "4em",
  background: "lightblue",
  fontSize: "2em",
  textAlign: "center",
  margin: "0px",
});

const TestPage = () => {
  const { timesPressed, resetState } = useCounterContext();

  return (
    <Container>
      <h1>This is my test page</h1>
      <h1>Times you changed the counters: {timesPressed}</h1>
      <Button>Styled Button</Button>
    </Container>
  );
};

export default TestPage;
