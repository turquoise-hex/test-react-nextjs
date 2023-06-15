import styled from "styled-components";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Counter } from "../components/counter";
import {
  getCounters,
  updateCounterFirestore,
  deleteCounterFirestore,
  CounterType,
} from "../store/countersStore";
import { motion } from "framer-motion";
import { Button } from "../components/Button.styled";
import AddCounterForm from "../components/AddCounterForm";
import { useAuth } from "../hooks/useAuth";
import { signInWithGoogle, logout } from "@/config/firebase";
import Total from "@/components/Total";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  alignItems: "center",
  gap: "20px",
  color: "black",
  background: `url(/background.jpg) no-repeat center center fixed`,
  backgroundSize: "cover",
  backgroundPosition: "center",

  overflow: "auto",
  minHeight: "100%",
  paddingTop: "5%",
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
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const PageContent = styled(motion.div)({
  borderRadius: "20px",
  padding: "20px",
  paddingBottom: "0px",
});

const Home = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  const { user, loading } = useAuth();
  const {
    data: counters,
    isLoading: isLoadingCounters,
    error,
    refetch,
  } = useQuery<CounterType[], Error>("counters", getCounters);

  const updateCounterMutation = useMutation(
    async ({ id, value }: { id: string; value: number }) => {
      await updateCounterFirestore({ id, value });
      await refetch();
    }
  );

  const deleteCounterMutation = useMutation(async (id: string) => {
    await deleteCounterFirestore(id);
    await refetch();
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
    );
  }

  return (
    <Wrapper>
      <PageContent
        as={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Total counters={counters} />
        {isLoadingCounters ? (
          <div>Loading...</div>
        ) : error instanceof Error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <CountersWrapper>
              {/* Slice the counters array to get the counters for the current page */}
              {counters
                ?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((counter) => (
                  <Counter
                    key={counter.id}
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
                ))}
            </CountersWrapper>
          </>
        )}
      </PageContent>
      <AddCounterForm style={{ marginTop: "30px" }} counters={counters} />
      {(counters?.length ?? 0) > (page + 1) * itemsPerPage && (
        <button onClick={() => setPage(page + 1)}>NEXT PAGE</button>
      )}
      {page > 0 && (
        <button onClick={() => setPage(page - 1)}>PREVIOUS PAGE</button>
      )}
      <Button onClick={logout}>Logout</Button>
    </Wrapper>
  );
};

export default Home;
