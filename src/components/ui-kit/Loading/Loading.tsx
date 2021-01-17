import React, { PureComponent } from "react";
import classes from "./Loading.module.css";
import cn from "clsx";
import { useLocale } from "react-targem";

interface LoadingProps {
  hasVerticalMargin?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  hasVerticalMargin,
}: LoadingProps) => {
  const { t } = useLocale();
  return (
    <div
      className={cn(classes.container, {
        [classes.hasVerticalMargin]: hasVerticalMargin,
      })}
    >
      <img
        className={cn(classes.image)}
        src={require("./assets/refresh.svg")}
        alt={t("Загрузка")}
      />
    </div>
  );
};

export default Loading;
