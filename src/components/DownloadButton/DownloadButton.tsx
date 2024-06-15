import React from "react";
import classes from "./DownloadButton.module.css";
import cn from "clsx";
import { useLocale } from "react-targem";
import { sendClickEvent } from "src/utils/analytics";
import downloadIcon from "./assets/download.svg";
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
      event: type === "chart" ? "chart_download" : "table_download",
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
      <img className={cn(classes.icon)} src={downloadIcon} alt={t("Скачать")} />
    </button>
  );
};

export default React.memo(DownloadButton);
