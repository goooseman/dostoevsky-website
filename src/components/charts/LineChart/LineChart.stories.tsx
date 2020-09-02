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
