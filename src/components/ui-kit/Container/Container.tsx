import React, { PureComponent } from "react";
import classes from "./Container.module.css";
import cn from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

class Container extends PureComponent<ContainerProps> {
  render(): React.ReactNode {
    return (
      <div className={cn(classes.container, this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
