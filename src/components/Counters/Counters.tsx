import React from "react";
import classes from "./Counters.module.css";
import cn from "clsx";
import Typography from "../ui-kit/Typography";
import Tooltip from "../ui-kit/Tooltip";

interface CountersProps {
  children: React.ReactNode;
  className?: string;
}

const Counters: React.FC<CountersProps> = (props: CountersProps) => {
  return (
    <div className={cn(classes.counters, props.className)}>
      {props.children}
    </div>
  );
};

interface CounterProps {
  counter: number | string;
  label: React.ReactNode;
  helpText?: string;
  withPercent?: boolean;
}

const Counter: React.FC<CounterProps> = (props: CounterProps) => {
  return (
    <div className={cn(classes.counterBlock)}>
      <Typography
        font="serif"
        className={cn(classes.counterNumber)}
        color="secondary"
      >
        <b>
          {props.counter} {props.withPercent ? " %" : null}
        </b>
      </Typography>
      <hr className={cn(classes.counterLine)} />
      <Typography>
        <b className={classes.uppercaseWrapper}>{props.label}</b>
        {props.helpText ? <Tooltip tip={props.helpText} /> : null}
      </Typography>
    </div>
  );
};

const CountersMemoized = React.memo(Counters);
const CounterMemoized = React.memo(Counter);

export { CountersMemoized as Counters, CounterMemoized as Counter };
