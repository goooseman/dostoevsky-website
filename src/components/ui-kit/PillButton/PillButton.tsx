import React from "react";
import classes from "./PillButton.module.css";
import cn from "clsx";

interface PillButtonProps {
  id?: string;
  handleChange?: (e: any) => void;
  handleClick?: (e: any) => void;
  value: string;
  variant: "black" | "primary" | "secondary" | "transparent";
}

const PillButton: React.FC<PillButtonProps> = ({
  id,
  handleChange,
  handleClick,
  value,
  variant = "black",
}: PillButtonProps) => {
  return (
    <button
      id={id}
      onClick={handleClick}
      onChange={handleChange}
      className={cn(classes.pillButton, {
        [classes.pillButtonBlack]: variant === "black",
        [classes.pillButtonPrimary]: variant === "primary",
        [classes.pillButtonSecondary]: variant === "secondary",
        [classes.pillButtonTransparent]: variant === "transparent",
      })}
    >
      {value}
    </button>
  );
};

export default PillButton;
