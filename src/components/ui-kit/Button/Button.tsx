import React, { PureComponent } from "react";
import classes from "./Button.module.css";
import cn from "clsx";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: "md" | "lg";
  color: "normal" | "inverted";
}

/**
 * Custom `Button` component to be used as a drop-in replacement for `<button />`.
 */
class Button extends PureComponent<ButtonProps> {
  public static defaultProps = {
    size: "md",
    color: "normal",
  };

  render(): React.ReactNode {
    const { children, className, size, color, ...otherProps } = this.props;

    return (
      <button
        className={cn(className, classes.button, {
          [classes.buttonLg]: size === "lg",
          [classes.buttonInverted]: color === "inverted",
        })}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
