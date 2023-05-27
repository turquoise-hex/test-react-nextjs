import React from "react";
import styled from "styled-components";

interface ButtonsProps {
  addA: () => void;
  deductA: () => void;
}

const ButtonContainer = styled.div({
  display: "flex",
});

export const Buttons = ({ addA, deductA }: ButtonsProps) => {
  return (
    <ButtonContainer>
      <button style={{ height: "52px", fontSize: "20px",  }} onClick={addA}>
        Add one
      </button>
      <button style={{ height: "52px", fontSize: "20px"  }} onClick={deductA}>
        Remove one
      </button>
    </ButtonContainer>
  );
};
