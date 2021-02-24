import React from "react";
import Header from "./Header";

export default { title: "components/Header", component: Header };

export const asSmallHeader = (): React.ReactNode => (
  <Header location={window.location} />
);

export const asBigHeader = (): React.ReactNode => (
  <Header isBig location={window.location} />
);
