import React, { PureComponent } from "react";
import ChartWrapper from "src/components/ChartWrapper";
import Chartist, {
  IChartistStepAxis,
  ChartDrawData,
  IChartDrawLabelData,
  IChartDrawGridData,
} from "chartist";
import classes from "./DonutChart.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import he from "he";

interface DonutChartProps extends React.ComponentProps<typeof ChartWrapper> {
  charts: {
    groups: number[];
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
      const { groups, tooltipDescription, labels } = charts[i];

      const series: { value: number }[] = groups.map((g, ii) => ({
        value: g,
        meta: { tooltip: tooltipDescription, label: labels[ii] },
      }));

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
          donutWidth: 120,
          showLabel: true,
          labelInterpolationFnc: (label: string, value: number) => {
            return value;
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
        {charts.map((c, i) => (
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
        ))}
      </ChartWrapper>
    );
  }

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
