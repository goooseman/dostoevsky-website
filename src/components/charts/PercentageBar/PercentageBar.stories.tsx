import React from "react";
import PercentageBar from "./PercentageBar";
import ChartWrapper from "src/components/ChartWrapper";

export default { title: "components/PercentageBar", component: PercentageBar };

const twoGroups = {
  groups: [
    {
      title: "Часть 2",
      values: [5, 5, 0, 0],
    },
    {
      title: "Часть 1",
      values: [14, 3, 95, 1],
    },
  ],
  labels: [
    "осуждённых",
    "оправданных",
    "прекращённых",
    "принудительное лечение",
  ],
};

export const withTwoGroups = (): React.ReactNode => (
  <ChartWrapper
    labels={twoGroups.labels}
    title="Чем закончились дела, дошедшие до суда по каждой части статьи 282"
  >
    <PercentageBar {...twoGroups} />
  </ChartWrapper>
);

const oneGroup = {
  groups: [
    {
      title: "",
      values: [14, 5],
    },
  ],
  labels: ["часть 1", "часть 2"],
};
export const withOneGroup = (): React.ReactNode => (
  <ChartWrapper
    labels={oneGroup.labels}
    title="Сравнение частей между собой: сколько человек осуждено по каждой части статьи 282 по основному составу "
  >
    <PercentageBar {...oneGroup} />
  </ChartWrapper>
);
