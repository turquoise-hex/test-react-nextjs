import React from "react";
import styled from "styled-components";

const TotalContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  padding: "40px",
  fontSize: "24px",
  fontWeight: "bold",
  opacity: "0.92",
  background: "#222",
  color: "#fff",
  "& > p": {
    fontSize: "40px",
    color: "color: #fff",
  },
});

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = ({ total }: TotalProps) => (
  <TotalContainer>
    <p>Total: {total}</p>
  </TotalContainer>
);

export default Total;
