import React from "react";
import PercentageBar from "./PercentageBar";

export default {
  title: "components/charts/PercentageBar",
  component: PercentageBar,
};

const twoGroups = {
  groups: [
    {
      title: "Часть 2",
      values: [5, 0, 5, 0],
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
  title: "Чем закончились дела, дошедшие до суда по каждой части статьи 282",
  downloadFilename: "test",
};

export const withTwoGroups = (): React.ReactNode => (
  <PercentageBar {...twoGroups} />
);

const oneGroup = {
  groups: [
    {
      title: "",
      values: [14, 5],
    },
  ],
  labels: ["часть 1", "часть 2"],
  title:
    "Сравнение частей между собой: сколько человек осуждено по каждой части статьи 282 по основному составу",
  downloadFilename: "test",
};
export const withOneGroup = (): React.ReactNode => (
  <PercentageBar {...oneGroup} />
);
