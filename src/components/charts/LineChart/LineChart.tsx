import React, { PureComponent } from "react";
import ChartWrapper from "src/components/ChartWrapper";
import Chartist, { IChartistStepAxis, ChartDrawData } from "chartist";
import he from "he";
import {
  centerXLabel,
  styleVerticalGrid,
  isGrid,
  isYGrid,
} from "src/utils/chartist";

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
            x: -4,
          },
          offset: 35,
        } as IChartistStepAxis,
        fullWidth: true,
        plugins,
      },
      [
        [
          "screen and (max-width: 640px)",
          {
            axisX: {
              labelInterpolationFnc: function (value: string, index: number) {
                if (index === labels.length - 1) {
                  return value;
                }
                return index % 2 === 0 ? value : null;
              },
            },
          },
        ],
      ]
    );

    chart.on("draw", (data: ChartDrawData) => {
      centerXLabel(data);
      styleVerticalGrid(data, Y_LABEL_MARGIN, true);
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

  /** Function to show horizontal grid a little left */
  private styleHorizontalGrid = (data: ChartDrawData): void => {
    if (!isGrid(data) || !isYGrid(data)) {
      return;
    }
    data.element.attr({
      x1: data.x1 - 5,
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
}

export default LineChart;
