import React, { PureComponent } from "react";
import classes from "./Container.module.css";
import cn from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  isThin?: boolean;
  className?: string;
}

class Container extends PureComponent<ContainerProps> {
  render(): React.ReactNode {
    const { isThin } = this.props;
    return (
      <div
        className={cn(classes.container, this.props.className, {
          [classes.isThin]: isThin,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Container;
