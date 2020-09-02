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

export const withTwoSections = (): React.ReactNode => (
  <Table
    {...defaultProps}
    title="Foo"
    tables={[
      {
        columns: [{ title: "", key: "title" }],
        rows: [
          {
            key: "1",
            values: [{ key: "title", value: "Foo" }],
          },
          {
            key: "2",
            values: [{ key: "title", value: "Block 1" }],
            isAccordion: true,
          },
          {
            key: "3",
            values: [{ key: "title", value: "Foo 1" }],
          },
          {
            key: "4",
            values: [{ key: "title", value: "Foo 1" }],
          },
          {
            key: "5",
            values: [{ key: "title", value: "Block 2" }],
            isAccordion: true,
          },
          {
            key: "6",
            values: [{ key: "title", value: "Foo 2" }],
          },
          {
            key: "7",
            values: [{ key: "title", value: "Foo 2" }],
          },
        ],
      },
    ]}
  />
);

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
  <Table
    {...defaultProps}
    title="Результаты рассмотрения дел по статье 282"
    tables={clauseParts}
  />
);

export const withClausePartsSecondTab = (): React.ReactNode => (
  <Table
    {...defaultProps}
    title="Результаты рассмотрения дел по статье 282"
    tables={clauseParts}
    activeTableIndex={1}
  />
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
  <Table
    {...defaultProps}
    title="Результаты рассмотрения дел по статье 282"
    tables={clauseManyParts}
    activeTableIndex={1}
  />
);

const clauseChrono = [
  {
    title: "Все года",
    columns: [
      { title: "Год", key: "1" },
      { title: "Всего осуждено", key: "2" },
      { title: "Оправдано", key: "3" },
      {
        title:
          "Прекращено за отсутствием события, состава, непричастности к преступлению",
        key: "4",
      },
      { title: "Прекращено по амнистии", key: "5" },
      { title: "Прекращено в связи с деятельным раскаянием ", key: "6" },
      { title: "Прекращено за примирением ", key: "7" },
      { title: "Судебный штраф", key: "8" },
      { title: "Прекращено по другим основаниям", key: "9" },
      { title: "Принудительные меры к невменяемым", key: "10" },
    ],
    rows: [
      {
        key: "1",
        values: [
          { key: "1", value: "2019" },
          { key: "2", value: "19" },
          { key: "3", value: "3" },
          { key: "4", value: "62" },
          { key: "5", value: "0" },
          { key: "6", value: "1" },
          { key: "7", value: "0" },
          { key: "8", value: "1" },
          { key: "9", value: "36" },
          { key: "10", value: "1" },
        ],
      },
      {
        key: "2",
        values: [
          { key: "1", value: "2018" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "3",
        values: [
          { key: "1", value: "2017" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "4",
        values: [
          { key: "1", value: "2016" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "5",
        values: [
          { key: "1", value: "2015" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "6",
        values: [
          { key: "1", value: "2014" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "7",
        values: [
          { key: "1", value: "2013" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "8",
        values: [
          { key: "1", value: "2012" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "9",
        values: [
          { key: "1", value: "2011" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
      {
        key: "10",
        values: [
          { key: "1", value: "2010" },
          { key: "2", value: "426" },
          { key: "3", value: "2" },
          { key: "4", value: "0" },
          { key: "5", value: "0" },
          { key: "6", value: "19" },
          { key: "7", value: "1" },
          { key: "8", value: "45" },
          { key: "9", value: "11" },
          { key: "10", value: "10" },
        ],
      },
    ],
  },
];

export const withClauseChronology = (): React.ReactNode => (
  <Table
    {...defaultProps}
    isEqualWidth
    isColored
    title="основные параметры"
    tables={clauseChrono}
  />
);
