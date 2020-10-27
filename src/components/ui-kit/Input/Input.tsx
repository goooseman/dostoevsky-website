import React from "react";
import classes from "./Input.module.css";
import cn from "clsx";

interface InputProps {
  type: string;
  value: string;
  placeholder: string;
  withIcon?: any;
  onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  placeholder = "",
  withIcon,
  onChange,
}: InputProps) => {
  return (
    <input
      className={cn(classes.input, {
        [classes.withIcon]: Boolean(withIcon),
      })}
      style={{ backgroundImage: withIcon ? `url(${withIcon})` : "" }}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
