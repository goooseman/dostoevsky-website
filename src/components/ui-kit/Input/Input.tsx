import React from "react";
import classes from "./Input.module.css";
import cn from "clsx";

interface InputProps {
  type: string;
  value: string;
  placeholder: string;
  icon?: string;
  className?: string;
  onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  placeholder = "",
  icon,
  onChange,
  required,
  className = "",
}: InputProps) => {
  return (
    <input
      className={cn(classes.input, className, {
        [classes.withIcon]: Boolean(icon),
      })}
      required={required}
      style={{ backgroundImage: icon ? `url(${icon})` : "" }}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default React.memo(Input);
