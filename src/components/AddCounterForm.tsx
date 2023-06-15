import React, { useState, FormEvent } from "react";
import { Button } from "./Button.styled";
import styled from "styled-components";
import { CounterType, useCounters } from "@/hooks/useCounters";

interface AddCounterFormProps {
  counters: CounterType[] | undefined;
  style?: React.CSSProperties;
}

const FormContainer = styled.form((props) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  ...props.style,
}));

const FieldsContainer = styled.div({
  display: "flex", 
  gap: "10px", 
});

const Input = styled.input((props) => ({
  height: "52px",
  fontSize: "20px",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  marginBottom: "10px",
  ...props.style,
}));

const AddCounterForm = ({ style }: AddCounterFormProps) => {
  const {counters, createCounter} = useCounters()
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (counters && counters.length >= 12) {
      alert("You cannot create more than 12 counters");
    } else if (value !== "") {
      createCounter({ value: Number(value) });
      setValue("");
    }
  };

  return (
    <>
     <FormContainer style={style} onSubmit={handleSubmit}>
      <FieldsContainer>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          required
          style={{}}
        />
       
      </FieldsContainer>
      <Button style={{ marginTop: "10px" }} type="submit">Create Counter</Button>
    </FormContainer>
    </>
  );
};

export default AddCounterForm;
