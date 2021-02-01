import React from "react";
import classes from "./Checkbox.module.css";
import cn from "clsx";

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className={cn(classes.checkbox)}>
      <input
        id={id}
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
      />
      <label htmlFor={id} />
    </div>
  );
};

export default Checkbox;
