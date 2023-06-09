// import styled from "styled-components";
// import { Button } from "../components/Button.styled";
// // import { useCounterStore } from "../store/countersStore";
// import { useFactsStore } from "../store/factsStore";
// import { useHistoryStore }  from "../store/historyStore";
// import { useEffect } from "react";
// import { useRef } from "react";
// import { StyledLink } from "../components/Link.styled";
// import Link from "next/link";

// const Wrapper = styled.div({
//   fontSize: "2em",
//   display: "flex",
//   flexDirection: "column",
//   width: "100vw",
//   height: "100vh",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "20px",
//   color: "black",
//   background: `url(/background.jpg) no-repeat center center fixed`,
// });

// const TestPage = () => {
//   const { resetState, timesPressed, total } = useCounterStore();
//   const { fact, fetchFacts, isLoading } = useFactsStore();
//   const { addToHistory, history, visible, setVisible } = useHistoryStore();
//   const prevFact = useRef(fact);

//   useEffect(() => {
//     fetchFacts(total);
//   }, [total]);

//   useEffect(() => {
//     console.log(visible);
//   }, [visible]);

//   useEffect(() => { //sets visibility of history to false once you go from home page to counters
//     if (visible) {
//       setVisible();
//     }
//   }, []);

//   const handleSaveFact = () => {
//     if (fact !== prevFact.current) {
//       addToHistory(total, fact);
//       prevFact.current = fact;
//     }
//   };

//   return (
//     <Wrapper>
//       <Button
//         style={{ position: "absolute", top: "20px", right: "20px" }}
//         onClick={() => {
//           console.log(history);
//           setVisible();
//         }}
//       >
//         SHOW SAVED FACTS
//       </Button>
//       {visible && (
//         <ul>
//           {history.map((item, index) => (
//             <li key={index}>{item.fact}</li>
//           ))}
//         </ul>
//       )}
//       <h1>Your number: {total}</h1>
//       <h3>Times you changed the counters: {timesPressed}</h3>
//       {isLoading ? <p>Loading...</p> : <p>{fact}</p>}

//       <Button onClick={resetState}>RESET STATE</Button>
//       <Button onClick={handleSaveFact}>SAVE FACT</Button>
//       <p></p>
//       <Link href="/">
//         <StyledLink style={{ fontSize: "1.0em" }}>Counters</StyledLink>
//       </Link>
//     </Wrapper>
//   );
// };

// export default TestPage;
