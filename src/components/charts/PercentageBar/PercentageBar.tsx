import React, { PureComponent } from "react";
import {
  Bar,
  Svg,
  FixedScaleAxis,
  IChartistFixedScaleAxis,
  IChartistStepAxis,
  ChartDrawData,
  IChartDrawBarData,
  IChartDrawGridData,
  IChartDrawLabelData,
} from "chartist";
import "chartist/dist/chartist.min.css";

const ROW_HEIGHT = 90;
const BAR_HEIGHT = 61;
const Y_LABEL_MARGIN = 15;
const X_TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

interface PercentageBarProps {
  groups: {
    values: number[];
    title: string;
  }[];
  labels: string[];
}

class PercentageBar extends PureComponent<PercentageBarProps> {
  private chartRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const series: { value: number; meta: { count: string } }[][] = [];
    const labels: string[] = [];

    this.props.groups.reverse().forEach((g, iG) => {
      labels.push(g.title);
      const totalCount = g.values.reduce((sum, val) => sum + val, 0);
      g.values.forEach((v, iV) => {
        if (!series[iV]) {
          series[iV] = [];
        }
        const percentage = v / (totalCount / 100);
        series[iV][iG] = { value: percentage, meta: { count: v.toString() } };
      });
    });

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
          ticks: X_TICKS,
          type: FixedScaleAxis,
          showGrid: true,
          labelOffset: {
            y: Y_LABEL_MARGIN,
          },
        } as IChartistFixedScaleAxis,
        axisY: {
          showGrid: true,
          stretch: true,
          labelOffset: {
            x: 40,
            y: -40,
          },
          offset: 0,
        } as IChartistStepAxis,
      }
    );
    chart.on("draw", (data: ChartDrawData) => {
      this.positionXLabel(data);
      this.addTextValueToBar(data);
      this.increaseBarHeight(data);
      this.styleHorizontalGrid(data);
      this.styleVerticalGrid(data);
    });
  }

  render(): React.ReactNode {
    return (
      <div
        style={{ height: this.props.groups.length * ROW_HEIGHT + 50 }}
        ref={this.chartRef}
      ></div>
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
    if (data.index === X_TICKS.length - 1) {
      data.element.attr({
        x: x - 19,
      });
      return;
    }

    data.element.attr({
      x: x - 7,
    });
  };

  private addTextValueToBar = (data: ChartDrawData): void => {
    if (!this.isBar(data)) {
      return;
    }
    const t = new Svg("text", {
      x: data.x1 + 10,
      y: data.y2 + 5,
      fill: "white",
    });
    const meta = data.meta as {
      count: string;
    };
    t.text(meta.count);
    data.group.append(t);
  };

  private increaseBarHeight = (data: ChartDrawData): void => {
    if (!this.isBar(data)) {
      return;
    }
    data.element.attr({
      style: `stroke-width: ${BAR_HEIGHT}px`,
    });
  };

  /** Function to remove all horizontal lines, except for the last one */
  private styleHorizontalGrid = (data: ChartDrawData): void => {
    if (!this.isGrid(data) || !this.isYGrid(data)) {
      return;
    }
    if (data.index !== 0) {
      data.element.remove();
    }
  };

  /** Function to show vertical grid under the canvas */
  private styleVerticalGrid = (data: ChartDrawData): void => {
    if (!this.isGrid(data) || !this.isXGrid(data)) {
      return;
    }
    data.element.attr({
      y1: data.y2,
      y2: data.y2 + Y_LABEL_MARGIN - 5,
    });
  };

  private isBar = (data: ChartDrawData): data is IChartDrawBarData =>
    data.type === "bar";

  private isLabel = (data: ChartDrawData): data is IChartDrawLabelData =>
    data.type === "label";

  private isXLabel = (data: IChartDrawLabelData) =>
    data.axis?.units.pos === "x";

  private isGrid = (data: ChartDrawData): data is IChartDrawGridData =>
    data.type === "grid";

  private isYGrid = (data: IChartDrawGridData) => data.axis?.units.pos === "y";

  private isXGrid = (data: IChartDrawGridData) => data.axis?.units.pos === "x";
}

export default PercentageBar;
