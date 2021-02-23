import React from "react";
import DownloadButton from "./DownloadButton";
import { action } from "@storybook/addon-actions";

export default {
  title: "components/DownloadButton",
  component: DownloadButton,
};

const handleClick = action("onClick");

export const byDefault = (): React.ReactNode => (
  <DownloadButton onClick={handleClick} title="Foo" type="chart" />
);
