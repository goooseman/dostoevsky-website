import React, { PureComponent } from "react";
import classes from "./Typography.module.css";
import cn from "clsx";

interface TypographyProps {
  variant: "p" | "h1" | "h2" | "h3" | "label" | "span";
  gutterBottom: boolean;
  size: "small" | "normal";
  color: "normal" | "inverted";
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
    size: "normal",
  };

  render(): React.ReactNode {
    const {
      variant,
      children,
      style,
      size,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      gutterBottom,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      color,
      ...otherProps
    } = this.props;
    const Component = variant;

    return (
      <Component {...otherProps} style={style} className={this.getClassName()}>
        {size === "small" ? <small>{children}</small> : children}
      </Component>
    );
  }

  private getClassName = (): string => {
    const { variant, className, color, gutterBottom } = this.props;
    return cn(
      classes.common,
      {
        [classes.p]: variant === "p",
        [classes.h1]: variant === "h1",
        [classes.h2]: variant === "h2",
        [classes.h3]: variant === "h3",
        [classes.colorInverted]: color === "inverted",
        [classes.gutterBottom]: gutterBottom,
      },
      className
    );
  };
}

export default Typography;
