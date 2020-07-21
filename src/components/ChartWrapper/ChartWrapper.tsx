import React, { PureComponent } from "react";
import classes from "./ChartWrapper.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { withLocale, WithLocale } from "react-targem";
import domtoimage, { Options } from "dom-to-image";
import { saveAs } from "file-saver";

interface ChartWrapperProps extends WithLocale {
  labels: string[];
  children: React.ReactNode;
  title: React.ReactNode;
  downloadFilename: string;
}

class ChartWrapper extends PureComponent<ChartWrapperProps> {
  private imageContainerRef = React.createRef<HTMLDivElement>();

  render(): React.ReactNode {
    const { children, labels, title, t } = this.props;

    return (
      <div className={cn(classes.chart)} ref={this.imageContainerRef}>
        <Typography className={cn(classes.title)} variant="h3" isUpperCased>
          <b>{title}</b>
        </Typography>
        <div className={cn(classes.legend)}>
          {labels.map((l, i) => (
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
              <Typography variant="span" className={cn(classes.legendTitle)}>
                <b>{l}</b>
              </Typography>
            </div>
          ))}
        </div>
        <div className={cn(classes.twoColumns)}>
          <div className={cn(classes.leftColumn)}>
            {children}
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
          <div className={cn(classes.actions)}>
            <button>
              <img src={require("./assets/embed.svg")} alt={t("Code icon")} />
            </button>
            <button onClick={this.handleDownloadButtonClick}>
              <img
                src={require("./assets/download.svg")}
                alt={t("Download icon")}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  private handleDownloadButtonClick = async () => {
    if (!this.imageContainerRef.current) {
      return;
    }

    const domtoimageOptions: Options = {
      filter: (node: Node) => (node as Element).tagName !== "BUTTON",
    };

    const isDebug = false as boolean;

    if (isDebug) {
      const dataUrl = await domtoimage.toSvg(
        this.imageContainerRef.current,
        domtoimageOptions
      );
      const img = new Image();
      img.src = dataUrl;
      const w = window.open("");
      w?.document.write(img.outerHTML);
      return;
    }

    const dataUrl = await domtoimage.toPng(
      this.imageContainerRef.current,
      domtoimageOptions
    );
    saveAs(dataUrl, this.props.downloadFilename);
  };
}

export default withLocale(ChartWrapper);
