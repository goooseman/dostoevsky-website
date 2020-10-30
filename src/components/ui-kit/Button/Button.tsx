import React, { PureComponent } from "react";
import classes from "./Button.module.css";
import cn from "clsx";
import { Link, GatsbyLinkProps } from "gatsby";

interface SvgArrowProps {
  color: "normal" | "inverted" | "secondary" | "third";
}

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: "md" | "lg";
  color: "normal" | "inverted" | "secondary" | "third";
  withArrow?: boolean;
}

interface LinkProps extends GatsbyLinkProps<{}> {
  size: "md" | "lg";
  color: "normal" | "inverted" | "secondary" | "third";
  withArrow?: boolean;
  to: string;
}

type ButtonComponentProps = LinkProps | ButtonProps;

const isAnchorProps = (props: ButtonComponentProps): props is LinkProps => {
  return props.hasOwnProperty("to");
};

const SvgArrow: React.FC<SvgArrowProps> = ({ color }: SvgArrowProps) => (
  <svg
    width="22"
    height="16"
    viewBox="0 0 22 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(classes.svgArrow, {
      [classes.svgInverted]: color === "inverted",
      [classes.svgSecondary]: color === "secondary",
      [classes.svgThird]: color === "third",
    })}
  >
    <path
      d="M13.7734 1L20.3773 7.60391L13.6748 14.3064"
      stroke="#FF6700"
      strokeWidth="2"
    />
    <path d="M20 8L-4.76837e-07 8" stroke="#FF6700" strokeWidth="2" />
  </svg>
);

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
      const {
        children,
        className,
        size,
        color,
        withArrow,
        ...otherProps
      } = this.props;

      return (
        /* @ts-ignore */
        <Link
          className={cn(className, classes.button, {
            [classes.buttonLg]: size === "lg",
            [classes.buttonInverted]: color === "inverted",
            [classes.buttonSecondary]: color === "secondary",
            [classes.buttonThird]: color === "third",
          })}
          {...otherProps}
        >
          {children}
          {withArrow ? <SvgArrow color={color} /> : null}
        </Link>
      );
    }

    const {
      children,
      className,
      size,
      color,
      withArrow,
      ...otherProps
    } = this.props;
    return (
      <button
        className={cn(className, classes.button, {
          [classes.buttonLg]: size === "lg",
          [classes.buttonInverted]: color === "inverted",
          [classes.buttonSecondary]: color === "secondary",
          [classes.buttonThird]: color === "third",
        })}
        {...otherProps}
      >
        {children}
        {withArrow ? <SvgArrow color={color} /> : null}
      </button>
    );
  }
}

export default Button;
