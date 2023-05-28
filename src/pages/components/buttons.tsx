import React from "react";
import styled from "styled-components";

interface ButtonsProps {
  addA: () => void;
  deductA: () => void;
}

const ButtonContainer = styled.div({
  display: "flex",
});

const Button = styled.button`
  height: 52px;
  font-size: 20px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  background: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #000;
  }
`;

export const Buttons = ({ addA, deductA }: ButtonsProps) => {
  return (
    <ButtonContainer>
      <Button style={{ height: "52px", fontSize: "20px",  }} onClick={addA}>
        Add one
      </Button>
      <Button style={{ height: "52px", fontSize: "20px"  }} onClick={deductA}>
        Remove one
      </Button>
    </ButtonContainer>
  );
};
