import React from "react";
import styled from "styled-components";

interface ButtonsProps {
  addA: () => void;
  deductA: () => void;
}


const ButtonContainer = styled.div({
  display: "flex",
  marginBottom: "10px", // Add margin-bottom to push the delete button down
});

const Button = styled.button({
  height: "52px",
  fontSize: "20px",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  marginRight: "8px",
  background: "#333",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s ease",

  "&:hover": {
    background: "#000",
  },
});

export const Buttons = ({ addA, deductA }: ButtonsProps) => {
  return (
    <ButtonContainer>
      <Button onClick={addA}>Add one</Button>
      <Button onClick={deductA}>Remove one</Button>
    </ButtonContainer>
  );
};