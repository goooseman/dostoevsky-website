import React from "react";
import classes from "./FaqPage.module.css";
import cn from "clsx";
import ReactTooltip from "react-tooltip";

interface FaqPageTooltipProps {
  tip: string;
}

const FaqPageTooltip: React.FC<FaqPageTooltipProps> = ({
  tip,
}: FaqPageTooltipProps) => {
  return (
    <>
      <img
        className={cn(classes.tooltipImage)}
        data-tip={tip}
        src={require("./assets/info.png")}
      />
      <ReactTooltip className={classes.tooltip} place="bottom" effect="solid" />
    </>
  );
};

export default FaqPageTooltip;
