import React, { PureComponent } from "react";
import { Bar, IChartistStepAxis } from "chartist";
import "chartist/dist/chartist.min.css";
import ChartWrapper from "src/components/ChartWrapper";

interface PercentageBarProps {
  groups: {
    values: number[];
    title: string;
  }[];
  labels: string[];
  title: React.ReactNode;
}

const ROW_HEIGHT = 50;

class PercentageBar extends PureComponent<PercentageBarProps> {
  private chartRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const series: { value: number }[][] = this.props.groups.map((g) =>
      g.values.reverse().map((v) => ({ value: v }))
    );
    const labels: string[] = this.props.labels.reverse();

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
    return (
      <ChartWrapper
        labels={this.props.groups.map((g) => g.title)}
        title="Виды наказаний по частям статьи 282"
      >
        <div
          ref={this.chartRef}
          style={{ height: this.props.labels.length * ROW_HEIGHT }}
        ></div>
      </ChartWrapper>
    );
  }
}

export default PercentageBar;
