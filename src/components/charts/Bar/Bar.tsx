import React, { PureComponent } from "react";
import ChartWrapper from "src/components/ChartWrapper";
import Chartist, {
  IChartistStepAxis,
  ChartDrawData,
  IChartDrawLabelData,
} from "chartist";
import he from "he";

interface PercentageBarProps extends React.ComponentProps<typeof ChartWrapper> {
  groups: {
    values: number[];
    title: string;
  }[];
  tooltipDescription: {
    [key: string]: string;
  };
}

const ROW_HEIGHT = 50;

class PercentageBar extends PureComponent<PercentageBarProps> {
  private chartRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const { groups, labels, tooltipDescription } = this.props;
    const series: { value: number }[][] = groups.map((g) =>
      g.values
        .slice()
        .reverse()
        .map((v) => ({ value: v, meta: { tooltip: tooltipDescription } }))
    );
    const chartLabels: string[] = labels.slice().reverse();

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
        labels: chartLabels,
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
        plugins,
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

  private getTooltipText = (meta: string, value: number) => {
    let metaDeserialized: {
      data: {
        tooltip: {
          [key: string]: string;
        };
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
      lines.push(`${lineKey}: ${lineValue.replace("%%", value.toString())}`);
    }
    return `<span class="chartist-tooltip-meta">${lines.join("<br>")}</span>`;
  };

  private isLabel = (data: ChartDrawData): data is IChartDrawLabelData =>
    data.type === "label";

  private isXLabel = (data: IChartDrawLabelData) =>
    data.axis?.units.pos === "x";
}

export default PercentageBar;
