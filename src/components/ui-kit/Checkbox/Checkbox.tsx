import React from "react";
import classes from "./Checkbox.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}: CheckboxProps) => {
  return (
    <div className={cn(classes.checkbox)}>
      <Typography variant="label">
        <input
          id={id}
          type="checkbox"
          checked={checked || false}
          onChange={onChange}
        />
        <div className={cn(classes.pseudo)} />
        {label}
      </Typography>
    </div>
  );
};

export default React.memo(Checkbox);
