import React from "react";
import ClausesPage from "./ClausesPage";

export default { title: "pages/ClausesPage", component: ClausesPage };

const parts = {
  text: { ru: "Фуу" },
  sections: [
    {
      text: { ru: "Секция" },
      chapters: [
        {
          text: { ru: "Глава" },
          url: "https://google.com",
        },
      ],
    },
  ],
};

export const withDefaultClauses = (): React.ReactNode => (
  <ClausesPage parts={parts} />
);
