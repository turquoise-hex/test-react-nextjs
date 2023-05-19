import styled from "styled-components";

interface ButtonsProps {
    addA: () => void;
    deductA: () => void;
}

const ButtonContainer = styled.div({
    display: "flex",
});

export const Buttons = (props: ButtonsProps) => {
    const {addA, deductA} = props;

    return (
        <ButtonContainer>
            <button onClick={addA}>pisos</button>
            <button onClick={deductA}>pisos2</button>
        </ButtonContainer>
    );
};
