import React from "react";
import classes from "./Tooltip.module.css";
import ReactTooltip from "react-tooltip";
import cn from "clsx";

interface TooltipProps {
  tip: string;
  isInversed?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  tip,
  isInversed,
  children,
  className,
}: TooltipProps) => {
  if (children) {
    return (
      <div className={cn(className)} data-tip={tip}>
        {children}
      </div>
    );
  }
  return (
    <span className={cn(classes.imgWrapper)}>
      <img
        className={cn(classes.tooltipImage, className)}
        data-tip={tip}
        src={
          isInversed
            ? require("./assets/info-inverse.svg")
            : require("./assets/info.svg")
        }
      />
    </span>
  );
};

export const TooltipMount: React.FC = () => {
  return (
    <div className={cn(classes.tooltipWrapper)}>
      <ReactTooltip
        html
        wrapper="span"
        className={cn(classes.tooltip)}
        place="bottom"
        effect="solid"
      />
    </div>
  );
};

export default Tooltip;
