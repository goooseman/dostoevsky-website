import React from "react";
import classes from "./IndexPage.module.css";
import { Counters, Counter } from "src/components/Counters";
import { T } from "react-targem";
import Container from "src/components/ui-kit/Container";

const IndexPageCounters = () => {
  return (
    <Container>
      <Counters className={classes.counter}>
        <Counter
          withPercent
          counter={140}
          label={
            <T message="оправдательных приговоров по отношению к общему числу дел" />
          }
        />
        <Counter
          withPercent
          counter={140}
          label={
            <T message="прекращенных дел по отношению к общему числу дел" />
          }
        />
        <Counter
          withPercent
          counter={140}
          label={
            <T message="обстоятельства, исключающие преступность, от общего числа дел" />
          }
        />
      </Counters>
    </Container>
  );
};

export default IndexPageCounters;
