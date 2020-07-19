import React, { PureComponent } from "react";
import classes from "./PercentageBar.module.css";
import cn from "clsx";
import {
  Bar,
  Svg,
  FixedScaleAxis,
  IChartistSvg,
  IChartistFixedScaleAxis,
  IChartistStepAxis,
} from "chartist";
import "chartist/dist/chartist.min.css";

const ROW_HEIGHT = 90;
const BAR_HEIGHT = 61;
const X_TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

interface ChartistRect {
  height: () => void;
  width: () => void;
  padding: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface ChartistUnits {
  dir: "vertical" | "horizontal";
  len: "height" | "width";
  pos: "x" | "y";
  rectEnd: string;
  rectOffset: string;
  rectStart: string;
}

interface ChartistAxis {
  axisLength: number;
  chartRect: ChartistRect;
  counterUnits: ChartistUnits;
  divisor: number;
  gridOffset: number;
  options: unknown;
  range: {
    min: number;
    max: number;
  };
  stepLength: number;
  ticks: number[];
  units: ChartistUnits;
}

interface ChartistDrawLabelData {
  type: "label";
  axis: ChartistAxis;
  element: IChartistSvg;
  group: IChartistSvg;
  height: number;
  index: number;
  text: number;
  width: number;
  x: number;
  y: number;
}

interface ChartistDrawGridData {
  type: "grid";
  axis: ChartistAxis;
  element: IChartistSvg;
  group: IChartistSvg;
  index: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface ChartistDrawBarData {
  type: "bar";
  axisX: ChartistAxis;
  axisY: ChartistAxis;
  chartRect: ChartistRect;
  element: IChartistSvg;
  group: IChartistSvg;
  index: number;
  meta: unknown;
  series: number[];
  seriesIndex: number;
  value: {
    x?: number;
    y?: number;
  };
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

type ChartistDrawData =
  | ChartistDrawBarData
  | ChartistDrawGridData
  | ChartistDrawLabelData;

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
        } as IChartistFixedScaleAxis,
        axisY: {
          showGrid: true,
          stretch: true,
          labelOffset: {
            x: 50,
            y: -40,
          },
          offset: 0,
        } as IChartistStepAxis,
      }
    );
    chart.on("draw", (data: ChartistDrawData) => {
      this.positionXLabel(data);
      this.addTextValueToBar(data);
      this.increaseBarHeight(data);
    });
  }

  render(): React.ReactNode {
    return (
      <div
        className={cn(classes.container)}
        style={{ height: 2 * ROW_HEIGHT + 50 }}
        ref={this.chartRef}
      ></div>
    );
  }

  private positionXLabel = (data: ChartistDrawData): void => {
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

  private addTextValueToBar = (data: ChartistDrawData): void => {
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

  private increaseBarHeight = (data: ChartistDrawData): void => {
    if (!this.isBar(data)) {
      return;
    }
    data.element.attr({
      style: `stroke-width: ${BAR_HEIGHT}px`,
    });
  };

  private isBar = (data: ChartistDrawData): data is ChartistDrawBarData =>
    data.type === "bar";

  private isLabel = (data: ChartistDrawData): data is ChartistDrawLabelData =>
    data.type === "label";

  private isXLabel = (data: ChartistDrawLabelData) =>
    data.axis?.units.pos === "x";
}

export default PercentageBar;
