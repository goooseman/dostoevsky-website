import React, { PureComponent } from "react";
import Bar from "./Bar";

interface BarContainerProps extends React.ComponentProps<typeof Bar> {}
interface BarContainerState {}

class BarContainer extends PureComponent<BarContainerProps, BarContainerState> {
  render(): React.ReactNode {
    const { groups, title, labels } = this.props;
    const forbiddenLabelsIndexes: { [key: number]: boolean } = {};
    groups[0].values.forEach((v: number, i: number) => {
      if (v !== 0) {
        return;
      }
      const notEmptyGroupWithSameLabel = groups.find((g) => g.values[i] !== 0);
      if (notEmptyGroupWithSameLabel) {
        return;
      }
      forbiddenLabelsIndexes[i] = true;
    });

    if (Object.keys(forbiddenLabelsIndexes).length === 0) {
      return <Bar groups={groups} title={title} labels={labels} />;
    }

    const filterOutForbiddenIndexes = (v: unknown, i: number) =>
      !forbiddenLabelsIndexes.hasOwnProperty(i);

    const filteredLabels = labels.filter(filterOutForbiddenIndexes);

    const filteredGroups = groups.map((g) => ({
      title: g.title,
      values: g.values.filter(filterOutForbiddenIndexes),
    }));

    return (
      <Bar labels={filteredLabels} groups={filteredGroups} title={title} />
    );
  }
}

export default BarContainer;
