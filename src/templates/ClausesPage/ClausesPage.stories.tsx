import React from "react";
import ClausesPage from "./ClausesPage";
import ukRf from "content/ук-рф.json";
import years from "content/years.json";

export default { title: "pages/ClausesPage", component: ClausesPage };

export const withDefaultClauses = (): React.ReactNode => (
  <ClausesPage parts={ukRf} actualYear={years[0]} />
);
