import React from "react";
import classes from "./Tooltip.module.css";
import ReactTooltip from "react-tooltip";

interface TooltipProps {
  tip: string;
  isInversed?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ tip, isInversed }: TooltipProps) => {
  return (
    <span className={classes.tooltipWrapper}>
      <img
        className={classes.tooltipImage}
        data-tip={tip}
        src={
          isInversed
            ? require("./assets/info-inverse.svg")
            : require("./assets/info.svg")
        }
      />
      <ReactTooltip
        wrapper="span"
        className={classes.tooltip}
        place="bottom"
        effect="solid"
      />
    </span>
  );
};

export default Tooltip;
