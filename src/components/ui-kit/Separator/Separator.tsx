import React, { PureComponent } from "react";
import classes from "./Separator.module.css";
import cn from "clsx";

interface SeparatorProps {
  className?: string;
}

class Separator extends PureComponent<SeparatorProps> {
  render(): React.ReactNode {
    const { className } = this.props;
    return <hr className={cn(className, classes.separator)} />;
  }
}

export default Separator;
