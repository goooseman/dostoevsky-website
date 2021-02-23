import React from "react";
import Table from "src/components/Table";
import { useLocale, T } from "react-targem";
import { getClauseLink } from "src/config/routes";

interface CommonMainResultsTableProps {
  clauseNumber: number;
  year: number;

  totalConvicted: number; // Всего осуждено
  totalAcquittal: number; // Оправдано
  totalDismissal: number; // Прекращено

  addTotalPersons: number; // Доп. квалификация: осуждено по числу лиц
  addAcquittalPersons: number; // Доп. квалификация: оправдано по числу лиц
  addDismissalPersons: number; // Доп. квалификация: прекращено по числу лиц
}

const CommonMainResultsTable: React.FC<CommonMainResultsTableProps> = ({
  clauseNumber,
  year,
  ...p
}: CommonMainResultsTableProps) => {
  const { t, locale } = useLocale();

  const tables = [
    {
      columns: [
        { title: "", key: "1" },
        { title: t("основной состав"), key: "2" },
        { title: t("дополнительный состав"), key: "3" },
      ],
      rows: [
        {
          key: "Осуждено",
          values: [
            {
              key: "title",
              value: "Осуждено",
            },
            {
              key: "main",
              value: p.totalConvicted,
            },
            {
              key: "add",
              value: p.addTotalPersons,
            },
          ],
        },
        {
          key: "Оправдано",
          values: [
            {
              key: "title",
              value: "Оправдано",
            },
            {
              key: "main",
              value: p.totalAcquittal,
            },
            {
              key: "add",
              value: p.addAcquittalPersons,
            },
          ],
        },
        {
          key: "Прекращено",
          values: [
            {
              key: "title",
              value: "Прекращено",
            },
            {
              key: "main",
              value: p.totalDismissal,
            },
            {
              key: "add",
              value: p.addDismissalPersons,
            },
          ],
        },
      ],
    },
  ];

  return (
    <Table
      title={t("Результаты рассмотрения дел по статье: основные параметры")}
      downloadFilename={`${clauseNumber}-common-main-by-result`}
      iframePath={getClauseLink(
        locale,
        clauseNumber,
        year,
        "main",
        "iframe-table-common-main-by-result"
      )}
      tables={tables}
    />
  );
};

export default CommonMainResultsTable;
