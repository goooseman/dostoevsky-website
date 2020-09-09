import React, { PureComponent } from "react";
import ChartWrapper from "src/components/ChartWrapper";
import Chartist, {
  IChartistStepAxis,
  ChartDrawData,
  IChartDrawLabelData,
  IChartDrawGridData,
} from "chartist";
import he from "he";

interface LineChartProps extends React.ComponentProps<typeof ChartWrapper> {
  groups: {
    values: number[];
    title: string;
  }[];
  tooltipDescription: {
    [key: string]: string;
  };
  labels: string[];
}

const Y_LABEL_MARGIN = 15;

class LineChart extends PureComponent<LineChartProps> {
  private chartRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const { groups, labels, tooltipDescription } = this.props;
    const series: { value: number }[][] = groups.map((g) =>
      g.values.slice().map((v, i) => ({
        value: v,
        meta: { tooltip: tooltipDescription, label: labels[i] },
      }))
    );

    const plugins = [];

    if (typeof window !== `undefined`) {
      require("chartist-plugin-tooltips");
      plugins.push(
        Chartist.plugins.tooltip({
          appendToBody: true,
          tooltipFnc: this.getTooltipText,
        })
      );
    }

    const chart = new Chartist.Line(
      this.chartRef.current,
      {
        labels: labels,
        series: series.slice().reverse(),
      },
      {
        axisX: {
          showGrid: true,
          labelOffset: {
            y: Y_LABEL_MARGIN,
          },
        },
        axisY: {
          showGrid: true,
          onlyInteger: true,
          scaleMinSpace: 40,
          labelOffset: {
            y: 6,
            x: 4,
          },
          offset: 35,
        } as IChartistStepAxis,
        fullWidth: true,
        plugins,
      }
    );

    chart.on("draw", (data: ChartDrawData) => {
      this.positionXLabel(data);
      this.styleVerticalGrid(data);
      this.styleHorizontalGrid(data);
    });
  }

  render(): React.ReactNode {
    const { groups, ...wrapperProps } = this.props;

    return (
      <ChartWrapper {...wrapperProps} labels={groups.map((g) => g.title)}>
        <div ref={this.chartRef} style={{ height: 500 }}></div>
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
        x: x - 23,
      });
      return;
    }

    data.element.attr({
      x: x - 13,
    });
  };

  /** Function to show horizontal grid a little left */
  private styleHorizontalGrid = (data: ChartDrawData): void => {
    if (!this.isGrid(data) || !this.isYGrid(data)) {
      return;
    }
    data.element.attr({
      x1: data.x1 - 5,
    });
  };

  /** Function to show vertical grid under the canvas */
  private styleVerticalGrid = (data: ChartDrawData): void => {
    if (!this.isGrid(data) || !this.isXGrid(data)) {
      return;
    }
    if (data.index === 0) {
      data.element.attr({
        y1: data.y1,
        y2: data.y2 + Y_LABEL_MARGIN - 5,
      });
      return;
    }
    data.element.attr({
      y1: data.y2,
      y2: data.y2 + Y_LABEL_MARGIN - 5,
    });
  };

  private getTooltipText = (meta: string, value: number) => {
    let metaDeserialized: {
      data: {
        tooltip: {
          [key: string]: string;
        };
        label: string;
      };
    };
    try {
      metaDeserialized = JSON.parse(he.decode(meta));
    } catch (e) {
      console.error(e);
      return '<span class="chartist-tooltip-meta">Error</span>';
    }
    const lines = [];
    for (const [lineKey, lineValue] of Object.entries(
      metaDeserialized.data.tooltip
    )) {
      lines.push(
        `${lineKey}: ${lineValue
          .replace("%%", value.toString())
          .replace("%label%", metaDeserialized.data.label)}`
      );
    }
    return `<span class="chartist-tooltip-meta">${lines.join("<br>")}</span>`;
  };

  private isLabel = (data: ChartDrawData): data is IChartDrawLabelData =>
    data.type === "label";

  private isXLabel = (data: IChartDrawLabelData) =>
    data.axis?.units.pos === "x";

  private isYGrid = (data: IChartDrawGridData) => data.axis?.units.pos === "y";

  private isGrid = (data: ChartDrawData): data is IChartDrawGridData =>
    data.type === "grid";

  private isXGrid = (data: IChartDrawGridData) => data.axis?.units.pos === "x";
}

export default LineChart;
