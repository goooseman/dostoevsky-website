import React from "react";
import Table from "./Table";
import { action } from "@storybook/addon-actions";

export default { title: "components/Table", component: Table };

const handleDownloadButtonClick = action("onDownloadButtonClick");
const handleTableTitleClick = action("onTableTitleClick");

const defaultProps = {
  onDownloadButtonClick: handleDownloadButtonClick,
  downloadFilename: "test",
  iframePath: "/test",
  activeTableIndex: 0,
  onTableTitleClick: () => handleTableTitleClick,
};

export const withClauseMain = (): React.ReactNode => (
  <Table
    {...defaultProps}
    title="Результаты рассмотрения дел по статье: основные параметры"
    tables={[
      {
        columns: [
          { title: "", key: "title" },
          { title: "Основной состав", key: "main" },
          { title: "Дополнительный состав", key: "additional" },
        ],
        rows: [
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
        ],
      },
    ]}
  />
);

const hiddenColumns = [
  { title: "", key: "title", isHidden: true },
  { title: "", key: "main", isHidden: true },
];

export const withClauseMainFocused = (): React.ReactNode => (
  <div style={{ padding: "0 0 0 100px" }}>
    <Table
      title="Результаты рассмотрения дел по статье 282 (Основной состав)"
      tables={[
        {
          columns: hiddenColumns,
          rows: [
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
          ],
        },
      ]}
      {...defaultProps}
    />
  </div>
);

const clauseRows = [
  {
    key: "1",
    values: [{ key: "title", value: "основной состав" }],
    isAccordion: true,
  },
  {
    key: "2",
    values: [
      { key: "title", value: "Всего осуждено" },
      { key: "main", value: "14" },
    ],
  },
  {
    key: "3",
    values: [
      { key: "title", value: "Оправдано" },
      { key: "main", value: "13" },
    ],
  },

  {
    key: "4",
    values: [
      { key: "title", value: "Принудительные меры к невменяемым" },
      { key: "main", value: "1" },
    ],
  },

  {
    key: "5",
    values: [
      {
        key: "title",
        value: "Преступление не является оконченным (приготовление, покушение)",
      },
      { key: "main", value: "0" },
    ],
  },

  {
    key: "6",
    values: [
      {
        key: "title",
        value:
          "Число лиц, в отношении которых уголовные дела прекращены за отсутствием состава, события преступления, непричастностью к преступлению по основной статье",
      },
      { key: "main", value: "57" },
    ],
  },

  {
    key: "7",
    values: [
      {
        key: "title",
        value:
          "Число лиц, в отношении которых уголовные дела прекращены по иным основаниям по основной стать",
      },
      { key: "main", value: "38" },
    ],
  },

  {
    key: "8",
    values: [
      {
        key: "title",
        value: "Освобождено от наказания или наказание не назначалось",
      },
      { key: "main", value: "0" },
    ],
  },
  {
    key: "9",
    values: [
      {
        key: "title",
        value: "дополнительный состав",
      },
    ],
    isAccordion: true,
  },
  {
    key: "10",
    values: [
      {
        key: "title",
        value: "Всего осуждено (по числу лиц)",
      },
      { key: "main", value: "9" },
    ],
  },
];

const clauseParts = [
  {
    title: "Часть 1",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 2",
    columns: hiddenColumns,
    rows: clauseRows,
  },
];

export const withClauseParts = (): React.ReactNode => (
  <div style={{ padding: "0 0 0 100px" }}>
    <Table
      {...defaultProps}
      title="Результаты рассмотрения дел по статье 282"
      tables={clauseParts}
    />
  </div>
);

export const withClausePartsSecondTab = (): React.ReactNode => (
  <div style={{ padding: "0 0 0 100px" }}>
    <Table
      {...defaultProps}
      title="Результаты рассмотрения дел по статье 282"
      tables={clauseParts}
      activeTableIndex={1}
    />
  </div>
);

const clauseManyParts = [
  {
    title: "Часть 1",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 2",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 3",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 4",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 5",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 6",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 7",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 8",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 9",
    columns: hiddenColumns,
    rows: clauseRows,
  },
  {
    title: "Часть 10",
    columns: hiddenColumns,
    rows: clauseRows,
  },
];
export const withClausePartsManyParts = (): React.ReactNode => (
  <div style={{ padding: "0 0 0 100px" }}>
    <Table
      {...defaultProps}
      title="Результаты рассмотрения дел по статье 282"
      tables={clauseManyParts}
      activeTableIndex={1}
    />
  </div>
);
