import React from "react";
import PercentageBar from "./PercentageBar";

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
  <PercentageBar {...twoGroups} />
);
