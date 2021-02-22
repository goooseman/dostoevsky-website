import React, { PureComponent } from "react";
import ChartWrapper from "src/components/ChartWrapper";
import Chartist from "chartist";
import classes from "./DonutChart.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import he from "he";
import NoData from "src/components/NoData";

interface DonutChartProps extends React.ComponentProps<typeof ChartWrapper> {
  charts: {
    groups: (number | null)[];
    title: React.ReactNode;
    tooltipDescription: {
      [key: string]: string;
    };
    labels: string[];
  }[];
}

class DonutChart extends PureComponent<DonutChartProps> {
  private chartRefs: React.RefObject<HTMLDivElement>[];

  public constructor(props: DonutChartProps) {
    super(props);
    this.chartRefs = [];
    for (let i = 0; i < props.charts.length; i++) {
      this.chartRefs[i] = React.createRef<HTMLDivElement>();
    }
  }

  public componentDidMount(): void {
    const { charts } = this.props;
    for (let i = 0; i < charts.length; i++) {
      if (!this.chartRefs[i].current) {
        return;
      }
      const { groups, tooltipDescription, labels } = charts[i];

      let totalSum = 0;

      const series: { value: number }[] = groups.map((g, ii) => {
        totalSum += g || 0;
        return {
          value: g || 0,
          meta: { tooltip: tooltipDescription, label: labels[ii] },
        };
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
      new Chartist.Pie(
        this.chartRefs[i].current,
        {
          labels: labels,
          series,
        },
        {
          donut: true,
          donutWidth: 80,
          showLabel: true,
          labelInterpolationFnc: (label: string, idx: number) => {
            const val = groups[idx] || 0;
            const percentage = (val / totalSum) * 100;
            if (percentage < 4) {
              return;
            }
            return val;
          },
          plugins,
        }
      );
    }
  }

  render(): React.ReactNode {
    const { charts, ...wrapperProps } = this.props;

    return (
      <ChartWrapper {...wrapperProps} labels={charts[0].labels}>
        {charts.map((c, i) =>
          this.isChartEmpty(c.groups) ? (
            <div
              key={i}
              className={cn(classes.donutChart)}
              style={{ width: `${100 / charts.length}%` }}
            >
              <Typography className={cn(classes.chartTitle)} isUpperCased>
                <b>
                  <small>{c.title}</small>
                </b>
              </Typography>
              <div
                ref={this.chartRefs[i]}
                style={{
                  height: 400,
                }}
              ></div>
            </div>
          ) : (
            <NoData
              style={{ width: `${100 / charts.length}%` }}
              key={i}
              className={classes.donutChart}
            />
          )
        )}
      </ChartWrapper>
    );
  }

  private isChartEmpty = (groups: (number | null)[]) => {
    return groups.filter((g) => g !== 0 && g !== null).length > 0;
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

export default DonutChart;
