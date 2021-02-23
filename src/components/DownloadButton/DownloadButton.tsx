import React from "react";
import classes from "./DownloadButton.module.css";
import cn from "clsx";
import { useLocale } from "react-targem";
import { sendClickEvent } from "src/utils/analytics";
interface DownloadButtonProps {
  onClick: () => void;
  title: string;
  type: "chart" | "table";
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  type,
  title,
}: DownloadButtonProps) => {
  const { t } = useLocale();
  const handleClick = () => {
    sendClickEvent({
      category: type === "chart" ? "Графики (скачать)" : "Таблицы (скачать)",
      label: title,
    });
    onClick();
  };
  return (
    <button
      className={cn(classes.button)}
      title={t("Скачать чарт")}
      onClick={handleClick}
    >
      <img src={require("./assets/download.svg")} alt={t("Скачать")} />
    </button>
  );
};

export default DownloadButton;
