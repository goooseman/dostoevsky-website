import React from "react";
import Table from "./Table";
import { action } from "@storybook/addon-actions";

export default { title: "components/Table", component: Table };

const handleDownloadButtonClick = action("onDownloadButtonClick");

export const withClauseMain = (): React.ReactNode => (
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
    downloadFilename="test.csv"
  />
);

export const withClauseMainFocused = (): React.ReactNode => (
  <div style={{ padding: "0 0 0 50px" }}>
    <Table
      title="Результаты рассмотрения дел по статье 282 (Основной состав)"
      columns={[
        { title: "", key: "title", isHidden: true },
        { title: "", key: "main", isHidden: true },
      ]}
      rows={[
        {
          key: "1",
          values: [
            { key: "title", value: "Всего осуждено" },
            { key: "main", value: "19" },
          ],
        },
        {
          key: "2",
          values: [
            { key: "title", value: "Оправдано" },
            { key: "main", value: "3" },
          ],
        },
        {
          key: "3",
          values: [
            { key: "title", value: "Принудительные меры к невменяемым" },
            { key: "main", value: "1" },
          ],
        },
        {
          key: "4",
          values: [
            {
              key: "title",
              value:
                "Преступление не является оконченным (приготовление, покушение)",
            },
            { key: "main", value: "0" },
          ],
        },
        {
          key: "5",
          values: [
            {
              key: "title",
              value:
                "Число лиц, в отношении которых уголовные дела прекращены за отсутствием состава, события преступления, непричастностью к преступлению по основной статье",
            },
            { key: "main", value: "62" },
          ],
        },
        {
          key: "6",
          values: [
            {
              key: "title",
              value:
                "Число лиц, в отношении которых уголовные дела прекращены по иным основаниям по основной статье",
            },
            { key: "main", value: "38" },
          ],
        },
        {
          key: "7",
          values: [{ key: "title", value: "ВИДЫ основного НАКАЗАНИЯ" }],
          isAccordion: true,
        },
        {
          key: "8",
          values: [
            { key: "title", value: "лишение свободы" },
            { key: "main", value: "6" },
          ],
        },
        {
          key: "9",
          values: [
            { key: "title", value: "условное осуждение к лишению свободы" },
            { key: "main", value: "10" },
          ],
        },
        {
          key: "10",
          values: [
            {
              key: "title",
              value: "содержание в дисциплинарной воинской част",
            },
            { key: "main", value: "0" },
          ],
        },
      ]}
      onDownloadButtonClick={handleDownloadButtonClick}
      downloadFilename="test.csv"
    />
  </div>
);
