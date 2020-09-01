import React, { PureComponent } from "react";
import Bar from "./Bar";

interface BarContainerProps extends React.ComponentProps<typeof Bar> {}
interface BarContainerState {}

class BarContainer extends PureComponent<BarContainerProps, BarContainerState> {
  render(): React.ReactNode {
    const { charts, labels, ...otherProps } = this.props;
    const forbiddenLabelsIndexes: { [key: number]: boolean } = {};
    let filteredLabels = [...labels];
    for (const chart of charts) {
      const { groups } = chart;
      groups[0].values.forEach((v: number, i: number) => {
        if (v !== 0) {
          return;
        }
        const notEmptyGroupWithSameLabel = groups.find(
          (g) => g.values[i] !== 0
        );
        if (notEmptyGroupWithSameLabel) {
          return;
        }
        forbiddenLabelsIndexes[i] = true;
      });

      if (Object.keys(forbiddenLabelsIndexes).length === 0) {
        return <Bar charts={charts} labels={labels} {...otherProps} />;
      }

      const filterOutForbiddenIndexes = (v: unknown, i: number) =>
        !forbiddenLabelsIndexes.hasOwnProperty(i);

      filteredLabels = filteredLabels.filter(filterOutForbiddenIndexes);

      const filteredGroups = groups.map((g) => ({
        title: g.title,
        values: g.values.filter(filterOutForbiddenIndexes),
      }));

      chart.groups = filteredGroups;
    }

    return <Bar labels={filteredLabels} charts={charts} {...otherProps} />;
  }
}

export default BarContainer;
