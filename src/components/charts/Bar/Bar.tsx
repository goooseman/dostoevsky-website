import React, { PureComponent } from "react";
import { Bar, IChartistStepAxis } from "chartist";
import "chartist/dist/chartist.min.css";
import ChartWrapper from "src/components/ChartWrapper";

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

    new Bar(
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
}

export default PercentageBar;
