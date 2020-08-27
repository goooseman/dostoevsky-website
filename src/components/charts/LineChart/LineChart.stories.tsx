import React from "react";
import LineChart from "./LineChart";

export default { title: "components/charts/LineChart", component: LineChart };

const twoGroups = {
  groups: [
    {
      title: "282 основной состав",
      values: [1, 1, 3, 5, 6, 8, 7, 9, 12, 16, 19],
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
