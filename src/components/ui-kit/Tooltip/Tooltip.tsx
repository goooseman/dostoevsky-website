import React from "react";
import classes from "./Tooltip.module.css";
import ReactTooltip from "react-tooltip";

interface TooltipProps {
  tip: string;
}

const Tooltip: React.FC<TooltipProps> = ({ tip }: TooltipProps) => {
  return (
    <span className={classes.tooltipWrapper}>
      <img
        className={classes.tooltipImage}
        data-tip={tip}
        src={require("./assets/info.png")}
      />
      <ReactTooltip className={classes.tooltip} place="bottom" effect="solid" />
    </span>
  );
};

export default Tooltip;
