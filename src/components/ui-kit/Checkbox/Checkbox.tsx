import React from "react";
import classes from "./Checkbox.module.css";
import cn from "clsx";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: any) => void;
  // value: string;
  // placeholder: string;
  // onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className={cn(classes.checkbox)}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id} />
    </div>
  );
};

export default Checkbox;
