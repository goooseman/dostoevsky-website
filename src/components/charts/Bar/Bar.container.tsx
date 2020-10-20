import React, { PureComponent } from "react";
import Bar from "./Bar";

interface BarContainerProps
  extends Omit<React.ComponentProps<typeof Bar>, "maxLabelsCount"> {
  areLabelsFiltered?: boolean;
  chartType?: string;
}
interface BarContainerState {}

class BarContainer extends PureComponent<BarContainerProps, BarContainerState> {
  render(): React.ReactNode {
    const { charts, areLabelsFiltered, ...otherProps } = this.props;
    const maxLabelsCount = charts[0].labels.length;
    const forbiddenChartsIndexes: { [key: number]: boolean } = {};
    charts.forEach((chart, chartI) => {
      let filteredLabels = [...chart.labels];
      const forbiddenLabelsIndexes: { [key: number]: boolean } = {};
      const { groups } = chart;

      groups[0].values.forEach((v: number, i: number) => {
        if (v !== 0 && v !== null) {
          return;
        }
        const notEmptyGroupWithSameLabel = groups.find(
          (g) => g.values[i] !== 0 && g.values[i] !== null
        );
        if (notEmptyGroupWithSameLabel) {
          return;
        }
        forbiddenLabelsIndexes[i] = true;
      });

      if (Object.keys(forbiddenLabelsIndexes).length === 0) {
        return (
          <Bar
            maxLabelsCount={maxLabelsCount}
            charts={charts}
            {...otherProps}
          />
        );
      }

      if (
        Object.keys(forbiddenLabelsIndexes).length === groups[0].values.length
      ) {
        forbiddenChartsIndexes[chartI] = true;
        return;
      }
      if (!areLabelsFiltered) {
        return;
      }
      const filterOutForbiddenIndexes = (v: unknown, i: number) =>
        !forbiddenLabelsIndexes.hasOwnProperty(i);

      filteredLabels = filteredLabels.filter(filterOutForbiddenIndexes);

      const filteredGroups = groups.map((g) => ({
        title: g.title,
        values: g.values.filter(filterOutForbiddenIndexes),
      }));

      chart.groups = filteredGroups;
      chart.labels = filteredLabels;
    });

    const filteredCharts = charts.filter(
      (v: unknown, i: number) => !forbiddenChartsIndexes.hasOwnProperty(i)
    );

    return (
      <Bar
        maxLabelsCount={maxLabelsCount}
        charts={filteredCharts}
        {...otherProps}
      />
    );
  }
}

export default BarContainer;
