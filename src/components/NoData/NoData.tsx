import React from "react";
import classes from "./NoData.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";

interface NoDataProps {
  className?: string;
  style?: React.CSSProperties;
}

const NoData: React.FC<NoDataProps> = ({ className, style }: NoDataProps) => {
  return (
    <div style={style} className={cn(className, classes.container)}>
      <Typography>
        <T message="Данных нет" />
      </Typography>
    </div>
  );
};

export default NoData;
