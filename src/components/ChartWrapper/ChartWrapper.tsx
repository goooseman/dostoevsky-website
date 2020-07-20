import React, { PureComponent } from "react";
import classes from "./ChartWrapper.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { withLocale, WithLocale } from "react-targem";

interface ChartWrapperProps extends WithLocale {
  labels: string[];
  children: React.ReactNode;
  title: React.ReactNode;
}

class ChartWrapper extends PureComponent<ChartWrapperProps> {
  render(): React.ReactNode {
    const { children, labels, title, t } = this.props;

    return (
      <div className={cn(classes.container)}>
        <div className={cn(classes.chart)}>
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
                <Typography variant="span">{l}</Typography>
              </div>
            ))}
          </div>
          <div className={cn(classes.twoColumns)}>
            <div className={cn(classes.leftColumn)}>
              {children}
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
            <div className={cn(classes.actions)}>
              <button>
                <img src={require("./assets/embed.svg")} alt={t("Code icon")} />
              </button>
              <button>
                <img
                  src={require("./assets/download.svg")}
                  alt={t("Download icon")}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLocale(ChartWrapper);
