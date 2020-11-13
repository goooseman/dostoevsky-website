import React from "react";
import classes from "./Counters.module.css";
import cn from "clsx";
import Typography from "../ui-kit/Typography";
import ReactTooltip from "react-tooltip";

interface CountersProps {
  children: React.ReactNode;
  className?: string;
}

export const Counters: React.SFC<CountersProps> = (props: CountersProps) => {
  return (
    <div className={cn(classes.counters, props.className)}>
      {props.children}
    </div>
  );
};

interface CounterProps {
  counter: number;
  label: React.ReactNode;
  helpText?: React.ReactNode;
  withPercent?: boolean;
}

export const Counter: React.SFC<CounterProps> = (props: CounterProps) => {
  return (
    <div className={cn(classes.counterBlock)}>
      <Typography
        font="serif"
        className={cn(classes.counterNumber)}
        color="secondary"
      >
        <b>
          {props.counter}
          {props.withPercent ? " %" : null}
        </b>
      </Typography>
      <hr className={cn(classes.counterLine)} />
      <Typography isUpperCased>
        <b>{props.label}</b>
      </Typography>
      {props.helpText ? (
        <img
          data-tip={props.helpText}
          className={classes.info}
          src={require("./assets/info.svg")}
        />
      ) : null}
      <ReactTooltip className={classes.tooltip} place="bottom" effect="solid" />
    </div>
  );
};
