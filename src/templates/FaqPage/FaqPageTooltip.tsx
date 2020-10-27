import React from "react";
import classes from "./FaqPage.module.css";
import cn from "clsx";
import { useLocale } from "react-targem";
import ReactTooltip from "react-tooltip";

interface FaqPageTooltipProps {
  tip: string;
}

const FaqPageTooltip: React.FC<FaqPageTooltipProps> = ({
  tip,
}: FaqPageTooltipProps) => {
  const { t } = useLocale();
  return (
    <>
      <img
        className={cn(classes.tooltipImage)}
        data-tip={t(tip)}
        src={require("./assets/info.png")}
      />
      <ReactTooltip className={classes.tooltip} place="bottom" effect="solid" />
    </>
  );
};

export default FaqPageTooltip;
