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
  return (
    <Container>
      <Counters className={classes.counter}>
        <Counter
          counter={
            Math.floor((totalAcquittal * 100000) / totalConvicted) / 1000
          }
          withPercent={true}
          helpText={"число оправдательных приговоров × 100 / общее число дел"}
          label={
            <T message="оправдательных приговоров по отношению к общему числу дел" />
          }
        />
        <Counter
          counter={
            Math.floor((totalDismissal * 100000) / totalConvicted) / 1000
          }
          withPercent={true}
          helpText={
            "число прекращенных дел (Прекращено по амнистии + Прекращено за примирением с потерпевшим + Прекращено в связи с деятельным раскаянием + Прекращено судебный штраф + Прекращено по другим основаниям) × 100 / общее число дел"
          }
          label={
            <T message="прекращeнных дел по отношению к общему числу дел" />
          }
        />
        <Counter
          counter={Math.floor((totalNoCrime * 100000) / totalConvicted) / 1000}
          withPercent={true}
          helpText={
            "(Обстоятельства, исключающие преступность: необходимая оборона + Обстоятельства, исключающие преступность: крайняя необходимость + Обстоятельства, исключающие преступность, предусмотренные статьями 38, 40 - 42 УК РФ) × 100 / общее число дел"
          }
          label={
            <T message="обстоятельства, исключающие преступность, от общего числа дел" />
          }
        />
      </Counters>
    </Container>
  );
};

export default IndexPageCounters;
