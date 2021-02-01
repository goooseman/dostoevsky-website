/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from "react";
import classes from "./Typography.module.css";
import cn from "clsx";

interface TypographyProps {
  variant: "p" | "h1" | "h2" | "h3" | "label" | "span" | "b" | "link";
  component?: "p" | "h1" | "h2" | "h3" | "label" | "span";
  font: "sans-serif" | "serif";
  isUpperCased: boolean;
  isCapitalized: boolean;
  isCentered: boolean;
  gutterBottom: boolean;
  gutterTop: boolean;
  isLineHeightDisabled: boolean;
  isNonBreakable: boolean;
  size?: "small" | "normal";
  color: "normal" | "inverted" | "muted" | "secondary";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  htmlFor?: string;
  id?: string;
}

/** A component to be used as a drop-in replacement for `<p />`, `<h1 />`, `<h2 />`, `<h3 />` */
class Typography extends PureComponent<TypographyProps> {
  public static defaultProps = {
    variant: "p",
    color: "normal",
    gutterBottom: false,
    gutterTop: false,
    isNonBreakable: false,
    size: "normal",
    isLineHeightDisabled: false,
    font: "sans-serif",
    isUpperCased: false,
    isCentered: false,
    isCapitalized: false,
  };

  render(): React.ReactNode {
    const {
      component,
      variant,
      children,
      style,
      size,
      font,
      isLineHeightDisabled,
      gutterBottom,
      color,
      isUpperCased,
      isCentered,
      gutterTop,
      isNonBreakable,
      isCapitalized,
      ...otherProps
    } = this.props;
    const Component = component || variant;

    return (
      <Component {...otherProps} style={style} className={this.getClassName()}>
        {size === "small" ? <small>{children}</small> : children}
      </Component>
    );
  }

  private getClassName = (): string => {
    const {
      variant,
      className,
      color,
      gutterBottom,
      isLineHeightDisabled,
      font,
      isUpperCased,
      isCentered,
      gutterTop,
      isNonBreakable,
      isCapitalized,
    } = this.props;
    return cn(
      classes.common,
      {
        [classes.h1]: variant === "h1",
        [classes.h2]: variant === "h2",
        [classes.h3]: variant === "h3",
        [classes.link]: variant === "link",
        [classes.colorInverted]: color === "inverted",
        [classes.colorMuted]: color === "muted",
        [classes.colorSecondary]: color === "secondary",
        [classes.isLineHeightDisabled]: isLineHeightDisabled,
        [classes.gutterBottom]: gutterBottom,
        [classes.gutterTop]: gutterTop,
        [classes.sansSerif]: font === "sans-serif",
        [classes.serif]: font === "serif",
        [classes.isUppercased]: isUpperCased,
        [classes.isCentered]: isCentered,
        [classes.isNonBreakable]: isNonBreakable,
        [classes.isCapitalized]: isCapitalized,
      },
      className
    );
  };
}

export default Typography;
