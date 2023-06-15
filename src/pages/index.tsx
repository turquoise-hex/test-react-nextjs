import styled from "styled-components";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Counter } from "../components/counter";

import { motion } from "framer-motion";
import AddCounterForm from "../components/AddCounterForm";
import Total from "@/components/Total";
import { useCounters } from "@/hooks/useCounters";

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
  const {counters,counterTotal, isLoadingCounters, error, deleteCounter, addCounter, deductCounter} = useCounters()
  
  return (
    <Wrapper>
      <PageContent
        as={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Total total={counterTotal} />
        {isLoadingCounters ? (
          <div>Loading...</div>
        ) : error instanceof Error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <CountersWrapper>
              {/* Slice the counters array to get the counters for the current page */}
              {counters && counters
                .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                .map((counter) => (
                  <Counter
                    key={counter.id}
                    id={counter.id}
                    addCounter={() => addCounter(counter)}
                    deductCounter={() => deductCounter(counter)}
                    value={counter.value}
                    deleteCounter={() => deleteCounter(counter.id)}
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
    </Wrapper>
  );
};

export default Home;
