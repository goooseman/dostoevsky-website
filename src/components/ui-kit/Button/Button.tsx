import React, { PureComponent } from "react";
import classes from "./Button.module.css";
import cn from "clsx";
import { Link, GatsbyLinkProps } from "gatsby";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: "md" | "lg";
  color: "normal" | "inverted" | "secondary";
}

interface LinkProps extends GatsbyLinkProps<{}> {
  size: "md" | "lg";
  color: "normal" | "inverted" | "secondary";
  to: string;
}

type ButtonComponentProps = LinkProps | ButtonProps;

const isAnchorProps = (props: ButtonComponentProps): props is LinkProps => {
  return props.hasOwnProperty("to");
};

/**
 * Custom `Button` component to be used as a drop-in replacement for `<button />`.
 */
class Button extends PureComponent<ButtonComponentProps> {
  public static defaultProps = {
    size: "md",
    color: "normal",
  };

  render(): React.ReactNode {
    if (isAnchorProps(this.props)) {
      const { children, className, size, color, ...otherProps } = this.props;

      return (
        /* @ts-ignore */
        <Link
          className={cn(className, classes.button, {
            [classes.buttonLg]: size === "lg",
            [classes.buttonInverted]: color === "inverted",
            [classes.buttonSecondary]: color === "secondary",
          })}
          {...otherProps}
        >
          {children}
        </Link>
      );
    }

    const { children, className, size, color, ...otherProps } = this.props;
    return (
      <button
        className={cn(className, classes.button, {
          [classes.buttonLg]: size === "lg",
          [classes.buttonInverted]: color === "inverted",
          [classes.buttonSecondary]: color === "secondary",
        })}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default Button;
