import React from "react";
import Table from "src/components/Table";
import { useLocale, T } from "react-targem";
import { getClauseLink } from "src/config/routes";
import { CountersByPunishment } from "src/types";

interface Year extends CountersByPunishment {
  year: number;
  totalConvicted: number; // Всего осуждено
}

interface ClauseChronologyByPunishmentTableProps {
  clauseNumber: number;
  years: Year[];
}

const ClauseChronologyByPunishmentTable: React.FC<ClauseChronologyByPunishmentTableProps> = ({
  clauseNumber,
  years,
}: ClauseChronologyByPunishmentTableProps) => {
  const { t, locale } = useLocale();

  const tables = [
    {
      title: t("Все года"),
      columns: [
        { title: t("Год"), key: "1" },
        { title: t("Лишение свободы"), key: "2" },
        { title: t("Условно к лишению свободы"), key: "3" },
        { title: t("Обязательные работы"), key: "4" },
        {
          title: t("Принудительные работы"),
          key: "5",
        },
        { title: t("Исправительные работы"), key: "6" },
        { title: t("Штраф"), key: "7" },
        { title: t("Принудительные меры к невменяемым"), key: "8" },
        { title: t("Условное к иным мерам"), key: "9" },
      ],
      rows: years.map((y) => ({
        key: y.year.toString(),
        values: [
          { key: "1", value: y.year },
          { key: "2", value: y.primaryImprisonment },
          { key: "3", value: y.primarySuspended },
          { key: "4", value: y.primaryCommunityService },
          { key: "5", value: y.primaryForcedLabour },
          { key: "6", value: y.primaryCorrectionalLabour },
          { key: "7", value: y.primaryFine },
          { key: "8", value: y.coerciveMeasures },
          { key: "9", value: y.primaryOther },
        ],
      })),
    },
  ];

  return (
    <Table
      isEqualWidth
      isColored
      title={t("Наказания по статье")}
      downloadFilename={`${clauseNumber}-chronology-by-punishment`}
      iframePath={getClauseLink(
        locale,
        clauseNumber,
        undefined,
        "parts",
        "iframe-table-chronology-by-punishment"
      )}
      isNotPaddedLeft
      tables={tables}
    />
  );
};

export default ClauseChronologyByPunishmentTable;
