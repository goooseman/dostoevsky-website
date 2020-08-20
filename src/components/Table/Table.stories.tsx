import React from "react";
import Table from "./Table";
import { action } from "@storybook/addon-actions";

export default { title: "components/Table", component: Table };

const handleDownloadButtonClick = action("onDownloadButtonClick");

export const withPartMain = (): React.ReactNode => (
  <Table
    title="Результаты рассмотрения дел по статье: основные параметры"
    columns={[
      { title: "", key: "title" },
      { title: "Основной состав", key: "main" },
      { title: "Дополнительный состав", key: "additional" },
    ]}
    rows={[
      {
        key: "1",
        values: [
          { key: "title", value: "Осуждено" },
          { key: "main", value: "19" },
          { key: "additional", value: "38" },
        ],
      },
      {
        key: "2",
        values: [
          { key: "title", value: "Оправдано" },
          { key: "main", value: "3" },
          { key: "additional", value: "6" },
        ],
      },
      {
        key: "3",
        values: [
          { key: "title", value: "Прекращено" },
          { key: "main", value: "101" },
          { key: "additional", value: "41" },
        ],
      },
    ]}
    onDownloadButtonClick={handleDownloadButtonClick}
  />
);
