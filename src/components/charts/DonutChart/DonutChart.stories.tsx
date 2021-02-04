import React from "react";
import DonutChart from "./DonutChart";

export default { title: "components/charts/DonutChart", component: DonutChart };

const commonProps = {
  downloadFilename: "test",
  iframePath: "/",
};

const tooltipDescription = {
  Состав: "Основной состав",
  Наказание: "%label%",
  "Число человек": "%%",
} as const;

const labels = [
  "прекращено дел в отношении человек",
  "оправданы",
  "осуждены",
  "принудительное лечение",
];

const fromClauseMainProps = {
  title: "Чем закончились дела по статье 282, дошедшие до суда",
  charts: [
    {
      title: "основной состав",
      labels,
      groups: [100, 3, 19, 1],
      tooltipDescription,
    },
    {
      title: "доп. состав (по числу лиц)",
      labels,
      groups: [100, 3, 19, 1],
      tooltipDescription,
    },
    {
      title: "доп. состав (по количеству составов)",
      labels,
      groups: [100, 3, 19, 1],
      tooltipDescription,
    },
  ],
  ...commonProps,
};

export const fromClauseMain = (): React.ReactNode => (
  <DonutChart {...fromClauseMainProps} />
);

const withSmallNumberProps = {
  title: "Чем закончились дела по статье 158, дошедшие до суда",
  charts: [
    {
      title: "основной состав",
      labels,
      groups: [150495, 39, 69467, 2043],
      tooltipDescription,
    },
    {
      title: "доп. состав (по числу лиц)",
      labels,
      groups: [18611, 194, 7335, 0],
      tooltipDescription,
    },
    {
      title: "доп. состав (по количеству составов)",
      labels,
      groups: [75780, 402, 12080, 1163],
      tooltipDescription,
    },
  ],
  ...commonProps,
};

export const withSmallNumber = (): React.ReactNode => (
  <DonutChart {...withSmallNumberProps} />
);
