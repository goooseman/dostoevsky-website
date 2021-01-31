import React from "react";
import PercentageBar from "./PercentageBar";

export default {
  title: "components/charts/PercentageBar",
  component: PercentageBar,
};

const commonProps = {
  downloadFilename: "test",
  title: "Заголовок",
  tooltipDescription: {
    Foo: "Bar",
    Состав: "Основной состав",
    "Число человек": "%%",
  },
  iframePath: "/",
};

const byResult = [
  "осуждeнных",
  "оправданных",
  "прекращeнных",
  "принудительное лечение",
];
export const withTwoGroups = (): React.ReactNode => {
  const props = {
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
    labels: byResult,
    title: "Чем закончились дела, дошедшие до суда по каждой части статьи 282",
  };
  return <PercentageBar {...commonProps} {...props} />;
};

export const withOneGroup = (): React.ReactNode => {
  const props = {
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
  return <PercentageBar {...commonProps} {...props} />;
};

export const withMediumBarInTheEnd = (): React.ReactNode => {
  const props = {
    groups: [
      {
        title: "",
        values: [828, 143, 37],
      },
    ],
    labels: ["109ч.1", "109ч.2", "109ч.3"],
  };
  return <PercentageBar {...commonProps} {...props} />;
};

export const withThreeBigCategories = (): React.ReactNode => {
  const props = {
    groups: [
      {
        title: "109ч.1",
        values: [37, 0, 19, 1],
      },
      {
        title: "109ч.2",
        values: [143, 20, 160, 0],
      },
      {
        title: "109ч.3",
        values: [828, 3, 316, 13],
      },
    ],
    labels: byResult,
  };
  return <PercentageBar {...commonProps} {...props} />;
};
