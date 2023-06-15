import React, { useState, FormEvent } from "react";
import { Button } from "./Button.styled";
import styled from "styled-components";
import { CounterType, useCounters } from "@/hooks/useCounters";
import { UseMutateFunction } from "react-query";

interface AddCounterFormProps {
  counters?: CounterType[];
  style?: React.CSSProperties;
}

const FormContainer = styled.form({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const FieldsContainer = styled.div({
  display: "flex",
  gap: "10px",
});

const Input = styled.input({
  height: "52px",
  fontSize: "20px",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  marginBottom: "10px",
});

interface AddCounterForm extends React.FormHTMLAttributes<HTMLFormElement> {
  counters?: CounterType[];
  createCounter: (value: number) => void;
}

const AddCounterForm = ({
  counters,
  createCounter,
  ...props
}: AddCounterForm) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (counters && counters.length >= 12) {
      alert("You cannot create more than 12 counters");
    } else if (value !== "") {
      createCounter(Number(value));
      setValue("");
    }
  };

  return (
    <FormContainer {...props} onSubmit={handleSubmit}>
      <FieldsContainer>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          required
        />
      </FieldsContainer>
      <Button style={{ marginTop: "10px" }} type="submit">
        Create Counter
      </Button>
    </FormContainer>
  );
};

export default AddCounterForm;
