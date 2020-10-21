import React from "react";
import Bar from "./Bar";

export default { title: "components/charts/Bar", component: Bar };

const commonProps = {
  downloadFilename: "test",
  iframePath: "/",
};

const tooltipDescription = {
  Foo: "Bar",
  Состав: "Основной состав",
  "Число человек": "%%",
} as const;

const twoGroupsLabels = [
  "пожизненное лишение свободы",
  "условное осуждение к лишению свободы",
  "арест",
  "ограничение свободы",
  "ограничение свободы/ограничение по военной службе, содержание в дисциплинарной воинской части",
  "исправительные работы",
  "обязательные работы",
  "принудительные работы",
  "штраф",
  "лишение права занимать определенные должности",
  "условное осуждение к иным мерам",
  "содержание в дисциплинарной воинской части",
  "ограничение по военной службе",
  "лишение свободы",
];

const twoGroups = {
  charts: [
    {
      groups: [
        {
          title: "Часть 1",
          values: [0, 4, 7, 1, 2, 2, 4, 6, 7, 5, 6, 1, 0, 9],
        },
        {
          title: "Часть 2",
          values: [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 9],
        },
      ],
      labels: twoGroupsLabels,
      tooltipDescription,
    },
  ],
  title: "Виды наказаний по частям статьи 282",
  maxLabelsCount: twoGroupsLabels.length,
  ...commonProps,
};

export const withTwoGroups = (): React.ReactNode => (
  <Bar {...twoGroups} chartType="partsByPunishment" />
);

const forChronoPageLabels = [
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
];

const forChronoPageProps = {
  charts: [
    {
      groups: [
        {
          title: "Основной состав",
          values: [2000, 8000, 80000, 60, 50, 2099, 102, 203, 3055, 2000, 1012],
        },
      ],
      labels: forChronoPageLabels,
      title: "Лишение свободы",
      tooltipDescription,
    },
    {
      groups: [
        {
          title: "Основной состав",
          values: [20, 80, 80, 60, 50, 20, 10, 20, 30, 20, 10],
        },
      ],
      labels: forChronoPageLabels,
      title: "условное осуждение к лишению свободы ",
      tooltipDescription,
    },
    {
      groups: [
        {
          title: "Основной состав",
          values: [20, 80, 80, 60, 50, 20, 10, 20, 30, 20, 10],
        },
      ],
      labels: forChronoPageLabels,
      title: "обязательные работы",
      tooltipDescription,
    },
    {
      groups: [
        {
          title: "Основной состав",
          values: [20, 80, 80, 60, 50, 20, 10, 20, 30, 20, 10],
        },
      ],
      labels: forChronoPageLabels,
      title: "принудительные работы",
      tooltipDescription,
    },
    {
      groups: [
        {
          title: "Основной состав",
          values: [20, 80, 80, 60, 50, 20, 10, 20, 30, 20, 10],
        },
      ],
      labels: forChronoPageLabels,
      title: "исправительные работы",
      tooltipDescription,
    },
    {
      groups: [
        {
          title: "Основной состав",
          values: [20, 80, 80, 60, 50, 20, 10, 20, 30, 20, 10],
        },
      ],
      labels: forChronoPageLabels,
      title: "штраф",
      tooltipDescription,
    },
    {
      groups: [
        {
          title: "Основной состав",
          values: [20, 80, 80, 60, 50, 20, 10, 20, 30, 20, 10],
        },
      ],
      labels: forChronoPageLabels,
      title: "принудительное лечение",
      tooltipDescription,
    },
    {
      groups: [
        {
          title: "Основной состав",
          values: [20, 80, 80, 60, 50, 20, 10, 20, 30, 20, 10],
        },
      ],
      labels: forChronoPageLabels,
      title: "условное осуждение к иным мерам",
      tooltipDescription,
    },
  ],
  maxLabelsCount: forChronoPageLabels.length,
  title: "Динамика наказаний по статье с 2009 по 2019 гг.",
  ...commonProps,
};

export const forChronoPage = (): React.ReactNode => (
  <Bar
    {...forChronoPageProps}
    areLabelsRotated
    chartType="dynamicsPunishment"
  />
);
