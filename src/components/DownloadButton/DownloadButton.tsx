import React, { PureComponent } from "react";
import classes from "./DownloadButton.module.css";
import cn from "clsx";
import { withLocale, WithLocale } from "react-targem";

interface DownloadButtonProps extends WithLocale {
  onClick: () => void;
}

class DownloadButton extends PureComponent<DownloadButtonProps> {
  render(): React.ReactNode {
    const { onClick, t } = this.props;
    return (
      <button
        className={cn(classes.button)}
        title={t("Download chart")}
        onClick={onClick}
      >
        <img src={require("./assets/download.svg")} alt={t("Download icon")} />
      </button>
    );
  }
}

export default withLocale(DownloadButton);
