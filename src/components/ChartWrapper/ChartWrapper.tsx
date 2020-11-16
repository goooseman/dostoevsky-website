import React, { PureComponent } from "react";
import classes from "./ChartWrapper.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import EmbedModal from "src/components/EmbedModal";
import DownloadButton from "src/components/DownloadButton";

import "chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css";
import "chartist/dist/chartist.min.css";

interface ChartWrapperProps {
  labels?: string[];
  title: React.ReactNode;
  downloadFilename: string;
  isIframeMode?: boolean;
  onDownloadButtonClick: () => void;
  downloadAreaRef: React.Ref<HTMLDivElement>;
  iframePath: string;
  isSeparateLabels?: boolean;
  centerTitle?: boolean;
}

class ChartWrapper extends PureComponent<
  React.PropsWithChildren<ChartWrapperProps>
> {
  public static defaultProps = {
    isIframeMode: false,
  };

  render(): React.ReactNode {
    const {
      children,
      labels,
      title,
      isIframeMode,
      onDownloadButtonClick,
      downloadAreaRef,
      iframePath,
      isSeparateLabels = false,
      centerTitle = false,
    } = this.props;

    return (
      <div className={cn(classes.chart)}>
        <div className={cn(classes.twoColumns)}>
          <div className={cn(classes.leftColumn)} ref={downloadAreaRef}>
            <Typography
              className={cn(classes.title, {
                [classes.center]: centerTitle,
              })}
              variant="h3"
              isUpperCased
            >
              <b>{title}</b>
            </Typography>
            <div
              className={cn(classes.legend, {
                [classes.flexWrap]: isSeparateLabels,
              })}
            >
              {labels?.map((l, i) => (
                <div key={i} className={cn(classes.legendItem)}>
                  <svg
                    width="16"
                    height="16"
                    className={`ct-series-${String.fromCharCode(97 + i)}`}
                  >
                    <rect
                      width="16"
                      height="16"
                      className={cn(classes.legendIcon)}
                    ></rect>
                  </svg>
                  <Typography
                    variant="span"
                    className={cn(classes.legendTitle)}
                  >
                    <b>{l}</b>
                  </Typography>
                </div>
              ))}
            </div>
            <div className={cn(classes.chartsContainer)}>{children}</div>
            <div className={cn(classes.footer)}>
              <hr className={cn(classes.border)} />
              <Typography color="muted">
                <small>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://cdep.ru/index.php?id=79"
                  >
                    Источник: Судебный департамент
                  </a>
                </small>
              </Typography>
            </div>
          </div>
          {!isIframeMode ? (
            <div className={cn(classes.actions)}>
              <EmbedModal iframePath={iframePath} />
              <DownloadButton onClick={onDownloadButtonClick} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ChartWrapper;
