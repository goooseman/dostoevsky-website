import React from "react";
import SinglePageLayout from "./SinglePageLayout";

export default {
  title: "components/SinglePageLayout",
  component: SinglePageLayout,
};

const defaultProps = {
  title: "О проекте",
} as const;

export const byDefault = (): React.ReactNode => (
  <SinglePageLayout {...defaultProps}>
    <div style={{ height: 2000 }}></div>
  </SinglePageLayout>
);
