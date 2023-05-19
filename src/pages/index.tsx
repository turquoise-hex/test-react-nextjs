import { styled } from "styled-components";
import { Counter } from "./components/counter";

const Wrapper = styled.div({
  display: "flex",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  gap: 20
});

export const Home = () => {


  return (
    <Wrapper id="sosi pisis">
      <Counter/>
      <Counter/>
      <Counter/>
    </Wrapper>
  );
};

export default Home;
