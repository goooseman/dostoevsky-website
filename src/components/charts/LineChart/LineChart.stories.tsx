import React from "react";
import LineChart from "./LineChart";

export default { title: "components/charts/LineChart", component: LineChart };

const twoGroups = {
  groups: [
    {
      title: "282 основной состав",
      values: [19, 16, 12, 9, 7, 8, 6, 5, 3, 1, 1],
    },
  ],
  labels: [
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
  ],
  title: "Динамика числа осужденных по основному составу",
  downloadFilename: "test",
  tooltipDescription: {
    Состав: "282 Основной состав",
    Год: "%label%",
    "Число человек": "%%",
  },
  iframePath: "/",
};

export const withTwoGroups = (): React.ReactNode => (
  <LineChart {...twoGroups} />
);

export const withBigNumbers = (): React.ReactNode => (
  <LineChart
    {...twoGroups}
    groups={[
      {
        title: "282 основной состав",
        values: [
          1900,
          1600,
          1200,
          9000,
          7000,
          8000,
          6000,
          5000,
          30000,
          1000,
          10000,
        ],
      },
    ]}
  />
);
