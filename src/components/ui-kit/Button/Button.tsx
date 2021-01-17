import React, { PureComponent } from "react";
import classes from "./Button.module.css";
import cn from "clsx";
import { Link, GatsbyLinkProps } from "gatsby";

interface SvgArrowProps {
  color: "normal" | "inverted" | "secondary" | "third" | "dark" | "link";
  verticalArrow: boolean;
  verticalArrowRotate?: boolean;
}

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size: "md" | "lg" | "sm";
  color: "normal" | "inverted" | "secondary" | "third" | "dark" | "link";
  withArrow?: boolean;
  verticalArrow?: boolean;
  verticalArrowRotate?: boolean;
}

interface LinkProps extends GatsbyLinkProps<{}> {
  size: "sm" | "md" | "lg";
  color: "normal" | "inverted" | "secondary" | "third" | "dark" | "link";
  withArrow?: boolean;
  verticalArrow?: boolean;
  verticalArrowRotate?: boolean;
  to: string;
}

type ButtonComponentProps = LinkProps | ButtonProps;

const isAnchorProps = (props: ButtonComponentProps): props is LinkProps => {
  return props.hasOwnProperty("to");
};

const SvgArrow: React.FC<SvgArrowProps> = ({
  color,
  verticalArrow,
  verticalArrowRotate,
}: SvgArrowProps) => (
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
      [classes.svgVertical]: verticalArrow === true,
      [classes.svgVerticalRotate]: verticalArrowRotate === true,
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
        verticalArrow = false,
        verticalArrowRotate = false,
        ...otherProps
      } = this.props;

      return (
        /* @ts-ignore */
        <Link
          className={cn(className, classes.button, {
            [classes.buttonLg]: size === "lg",
            [classes.buttonSm]: size === "sm",
            [classes.buttonInverted]: color === "inverted",
            [classes.buttonSecondary]: color === "secondary",
            [classes.buttonThird]: color === "third",
            [classes.buttonLink]: color === "link",
          })}
          {...otherProps}
        >
          <span>
            {children}
            {withArrow ? (
              <SvgArrow
                color={color}
                verticalArrow={verticalArrow}
                verticalArrowRotate={verticalArrowRotate}
              />
            ) : null}
          </span>
        </Link>
      );
    }

    const {
      children,
      className,
      size,
      color,
      withArrow,
      verticalArrow = false,
      verticalArrowRotate = false,
      ...otherProps
    } = this.props;
    return (
      <button
        className={cn(className, classes.button, {
          [classes.buttonLg]: size === "lg",
          [classes.buttonSm]: size === "sm",
          [classes.buttonInverted]: color === "inverted",
          [classes.buttonSecondary]: color === "secondary",
          [classes.buttonThird]: color === "third",
          [classes.buttonDark]: color === "dark",
          [classes.buttonLink]: color === "link",
        })}
        {...otherProps}
      >
        {children}
        {withArrow ? (
          <SvgArrow
            color={color}
            verticalArrow={verticalArrow}
            verticalArrowRotate={verticalArrowRotate}
          />
        ) : null}
      </button>
    );
  }
}

export default Button;
