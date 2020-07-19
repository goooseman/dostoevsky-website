import React, { PureComponent } from "react";
import classes from "./ChartLegend.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";

interface ChartLegendProps {
  labels: string[];
}

class ChartLegend extends PureComponent<ChartLegendProps> {
  render(): React.ReactNode {
    return (
      <div className={cn(classes.legend)}>
        {this.props.labels.map((l, i) => (
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
    );
  }
}

export default ChartLegend;
