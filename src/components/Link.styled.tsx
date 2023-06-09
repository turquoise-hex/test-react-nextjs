import styled from "styled-components";

export const StyledLink = styled.h1({
    display: "inline-block",
    padding: "10px 20px",
    border: "2px solid #000",
    cursor: "pointer",
    backgroundColor: "#ddd",
    color: "#000",
    borderRadius: "4px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#aaa",
      color: "#fff",
    },
  });