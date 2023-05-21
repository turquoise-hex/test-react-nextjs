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
      <button onClick={addA}>Add one</button>
      <button onClick={deductA}>Remove one</button>
    </ButtonContainer>
  );
};
