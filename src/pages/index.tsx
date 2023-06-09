import styled from "styled-components";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Counter } from "../components/counter";
import {
  getCounters,
  updateCounterFirestore,
  deleteCounterFirestore,
  CounterType,
} from "../store/countersStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/Button.styled";
import { StyledLink } from "../components/Link.styled";
import AddCounterForm from "../components/AddCounterForm";
import { useAuth } from "../hooks/useAuth";
import { signInWithGoogle, logout } from "@/config/firebase";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  //height: "100vh",
  alignItems: "center",
  //justifyContent: "center",
  gap: "20px",
  color: "black",
  background: `url(/background.jpg) no-repeat center center fixed`,
  backgroundSize: "cover",
  backgroundPosition: "center",
 
  overflow: "auto", 
  minHeight: "100%",
  paddingTop: '10%', 
});


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

const CountersWrapper = styled.div({
  display: "flex",
  marginTop: "20px",
  gap: "20px",
  opacity: "0.91",
  flexWrap: "wrap",
  '@media (max-width: 600px)': {
    flexDirection: "column",
    alignItems: "flex-start"
  }
});

const PageContent = styled(motion.div)({
  borderRadius: "20px",
  padding: "20px",
  paddingBottom: "0px",
});


const Home = () => {
  const { user, loading } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: counters,
    isLoading: isLoadingCounters,
    error,
  } = useQuery<CounterType[], Error>("counters", getCounters);

  const updateCounterMutation = useMutation(updateCounterFirestore, {
    onSuccess: () => {
      queryClient.invalidateQueries("counters");
    },
  });



  const deleteCounterMutation = useMutation(deleteCounterFirestore, {
    onSuccess: () => {
      queryClient.invalidateQueries("counters");
    },
  });

  const handleCounterUpdate = (id: string, value: number) => {
    updateCounterMutation.mutate({ id, value });
  };

  const handleCounterDelete = (id: string) => {
    deleteCounterMutation.mutate(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Wrapper>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>;
      </Wrapper>   
  )}


  return (
    <Wrapper>
      <PageContent
        as={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <TotalContainer>
          <p>
            Total:{" "}
            {counters?.reduce((total, counter) => total + counter.value, 0) ||
              0}
          </p>
        </TotalContainer>
        {isLoadingCounters ? (
          <div>Loading...</div>
        ) : error instanceof Error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <CountersWrapper>
              {counters?.map((counter) => (
                <React.Fragment key={counter.id}>
                  <Counter
                    id={counter.id}
                    addCounter={() => {
                      handleCounterUpdate(counter.id, counter.value + 1);
                    }}
                    deductCounter={() => {
                      handleCounterUpdate(counter.id, counter.value - 1);
                    }}
                    value={counter.value}
                    deleteCounter={() => handleCounterDelete(counter.id)}
                  />
                </React.Fragment>
              ))}
            </CountersWrapper>
            
          </>
        )}
      </PageContent>
      <AddCounterForm style={{marginTop: "60px"}} counters={counters}/>
      <Button onClick={logout}>Logout</Button>
    </Wrapper>
  );
};

export default Home;
