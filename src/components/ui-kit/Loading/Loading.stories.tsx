import React from "react";
import Loading from "./Loading";

export default { title: "components/ui-kit/Loading", component: Loading };

export const base = (): React.ReactNode => <Loading />;

export const withVerticalMargin = (): React.ReactNode => (
  <Loading hasVerticalMargin />
);
