/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import classes from "./PillButton.module.css";
import cn from "clsx";

export type PillButtonVariant =
  | "black"
  | "analytics"
  | "secondary"
  | "primary"
  | "blog"
  | "transparent";

interface PillButtonProps {
  id?: string;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  value: string;
  variant?: PillButtonVariant;
  isActive?: boolean;
}

const PillButton: React.FC<PillButtonProps> = ({
  id,
  onClick,
  onChange,
  value,
  isActive,
  variant = "black",
}: PillButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      onChange={onChange}
      className={cn(classes.pillButton, {
        [classes.pillButtonBlack]: variant === "black",
        [classes.pillButtonPrimary]:
          variant === "primary" || variant === "analytics",
        [classes.pillButtonSecondary]:
          variant === "secondary" || variant === "blog",
        [classes.pillButtonTransparent]: variant === "transparent",
        [classes.isActive]: isActive,
      })}
    >
      {value}
    </button>
  );
};

export default PillButton;
