import React, { PureComponent } from "react";
import Chartist, {
  FixedScaleAxis,
  IChartistFixedScaleAxis,
  IChartistStepAxis,
  ChartDrawData,
  IChartDrawBarData,
} from "chartist";
import ChartWrapper from "src/components/ChartWrapper";
import he from "he";
import {
  centerXLabel,
  styleVerticalGrid,
  removeHorizontalGridExceptLast,
} from "src/utils/chartist";

const ROW_HEIGHT = 90;
const BAR_HEIGHT = 61;
const Y_LABEL_MARGIN = 15;
const X_TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

interface PercentageBarProps extends React.ComponentProps<typeof ChartWrapper> {
  groups: {
    values: number[];
    title: string;
  }[];
  labels: string[];
  tooltipDescription: {
    [key: string]: string;
  };
}

interface PercentageBarMeta {
  title: string;
  count: string;
  isLast: boolean;
  tooltip: {
    [key: string]: string;
  };
}

class PercentageBar extends PureComponent<PercentageBarProps> {
  private chartRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const { labels: chartLabels } = this.props;
    const series: {
      value: number;
      meta: PercentageBarMeta;
    }[][] = [];
    const labels: string[] = [];
    const { tooltipDescription, groups } = this.props;
    groups
      .slice()
      .reverse()
      .forEach((g, iG) => {
        labels.push(g.title);
        const totalCount = g.values.reduce((sum, val) => sum + val, 0);
        g.values.forEach((v, iV) => {
          if (!series[iV]) {
            series[iV] = [];
          }
          const percentage = v / (totalCount / 100);
          if (v !== 0) {
            for (let i = 0; i < iV; i++) {
              series[i][iG].meta.isLast = false;
            }
          }
          series[iV][iG] = {
            value: percentage,
            meta: {
              count: v.toString(),
              title: chartLabels[iV],
              isLast: true,
              tooltip: tooltipDescription,
            },
          };
        });
      });

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

    const chart = new Chartist.Bar(
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
            x: 0,
            y: -40,
          },
          offset: 0,
        } as IChartistStepAxis,
        plugins,
      }
    );
    chart.on("draw", (data: ChartDrawData) => {
      centerXLabel(data);
      this.addTextValueToBar(data);
      this.increaseBarHeight(data);
      removeHorizontalGridExceptLast(data);
      styleVerticalGrid(data, Y_LABEL_MARGIN);
    });
  }

  render(): React.ReactNode {
    const { labels, groups, ...wrapperProps } = this.props;

    return (
      <ChartWrapper {...wrapperProps} labels={labels}>
        <div
          style={{ height: groups.length * ROW_HEIGHT + 50 }}
          ref={this.chartRef}
        ></div>
      </ChartWrapper>
    );
  }

  private getTooltipText = (meta: string) => {
    let metaDeserialized: {
      data: PercentageBarMeta;
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
          .replace("%%", metaDeserialized.data.count)
          .replace("^^", metaDeserialized.data.title)}`
      );
    }
    return `<span class="chartist-tooltip-meta">${lines.join("<br>")}</span>`;
  };

  private addTextValueToBar = (data: ChartDrawData): void => {
    if (!this.isBar(data)) {
      return;
    }

    let x = data.x1 + 5;
    let textAnchor = "start";
    let className = "ct-inner-label";

    if (this.isLastBar(data)) {
      x = data.x2 - 5;
      if (this.isSmallBar(data)) {
        x = data.x2 + 1;
        className += " ct-inner-label-dark";
      } else {
        textAnchor = "end";
      }
    }

    const t = new Chartist.Svg("text", {
      x,
      y: data.y2 + 5,
      "text-anchor": textAnchor,
    }).addClass(className);
    const meta = data.meta as {
      count: string;
    };
    if (meta.count === "0") {
      return;
    }

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

  private isBar = (
    data: ChartDrawData
  ): data is IChartDrawBarData<PercentageBarMeta> => data.type === "bar";

  private isLastBar = (data: IChartDrawBarData<PercentageBarMeta>): boolean =>
    data.meta.isLast;

  private isSmallBar = (data: IChartDrawBarData<PercentageBarMeta>): boolean =>
    data.x2 - data.x1 < 20;
}

export default PercentageBar;
