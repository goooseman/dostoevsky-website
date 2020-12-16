/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React from "react";
import classes from "./IndexPage.module.css";
import { Counters, Counter } from "src/components/Counters";
import { T } from "react-targem";
import Container from "src/components/ui-kit/Container";

interface IndexPageCountersProps {
  counters: {
    totalConvicted: number;
    totalAcquittal: number;
    totalDismissal: number;
    totalNoCrime: number;
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IndexPageCounters = (props: IndexPageCountersProps) => {
  const {
    totalConvicted,
    totalAcquittal,
    totalDismissal,
    totalNoCrime,
  } = props.counters;
  console.debug(props.counters);
  return (
    <Container>
      <Counters className={classes.counter}>
        <Counter
          counter={Math.floor((totalAcquittal * 100) / totalConvicted)}
          withPercent={true}
          label={
            <T message="оправдательных приговоров по отношению к общему числу дел" />
          }
        />
        <Counter
          counter={Math.floor((totalDismissal * 100) / totalConvicted)}
          withPercent={true}
          label={
            <T message="прекращённых дел по отношению к общему числу дел" />
          }
        />
        <Counter
          counter={Math.floor((totalNoCrime * 100) / totalConvicted)}
          withPercent={true}
          label={
            <T message="обстоятельства, исключающие преступность, от общего числа дел" />
          }
        />
      </Counters>
    </Container>
  );
};

export default IndexPageCounters;
