import React, { PureComponent } from "react";
import "chartist/dist/chartist.min.css";
import ChartWrapper from "src/components/ChartWrapper";
import {
  Bar,
  IChartistStepAxis,
  ChartDrawData,
  IChartDrawLabelData,
} from "chartist";

interface PercentageBarProps extends React.ComponentProps<typeof ChartWrapper> {
  groups: {
    values: number[];
    title: string;
  }[];
}

const ROW_HEIGHT = 50;

class PercentageBar extends PureComponent<PercentageBarProps> {
  private chartRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const series: { value: number }[][] = this.props.groups.map((g) =>
      g.values
        .slice()
        .reverse()
        .map((v) => ({ value: v }))
    );
    const labels: string[] = this.props.labels.slice().reverse();

    const chart = new Bar(
      this.chartRef.current,
      {
        labels,
        series,
      },
      {
        stackBars: true,
        horizontalBars: true,
        axisX: {
          onlyInteger: true,
          showGrid: false,
        },
        axisY: {
          stretch: true,
          showGrid: false,
          labelOffset: {
            x: 0,
            y: -17,
          },
          offset: 0,
        } as IChartistStepAxis,
      }
    );

    chart.on("draw", (data: ChartDrawData) => {
      this.positionXLabel(data);
    });
  }

  render(): React.ReactNode {
    const { labels, groups, ...wrapperProps } = this.props;

    return (
      <ChartWrapper {...wrapperProps} labels={groups.map((g) => g.title)}>
        <div
          ref={this.chartRef}
          style={{ height: labels.length * ROW_HEIGHT }}
        ></div>
      </ChartWrapper>
    );
  }

  private positionXLabel = (data: ChartDrawData): void => {
    if (!this.isLabel(data) || !this.isXLabel(data)) {
      return;
    }
    if (data.index === 0) {
      return;
    }
    const x = data.x || 0;

    if (data.index === data.axis.ticks.length - 1) {
      data.element.attr({
        x: x - 19,
      });
      return;
    }

    data.element.attr({
      x: x - 7,
    });
  };

  private isLabel = (data: ChartDrawData): data is IChartDrawLabelData =>
    data.type === "label";

  private isXLabel = (data: IChartDrawLabelData) =>
    data.axis?.units.pos === "x";
}

export default PercentageBar;
