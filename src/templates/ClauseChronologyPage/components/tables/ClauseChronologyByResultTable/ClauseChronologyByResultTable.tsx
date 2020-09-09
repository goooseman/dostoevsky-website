import React from "react";
import Table from "src/components/Table";
import { useLocale, T } from "react-targem";
import { getClauseLink } from "src/config/routes";

interface Year {
  year: string;
  totalConvicted: number; // Всего осуждено

  totalAcquittal: number; // Оправдано
  dismissalAbsenceOfEvent: number; // Прекращено за отсутствием события, состава, непричастностью к преступлению
  dismissalAmnesty: number; // Прекращено по амнистии
  dismissalRepentance: number; // Прекращено в связи с деятельным раскаянием
  dismissalReconciliation: number; // Прекращено за примирением с потерпевшим
  dismissalCourtFine: number; // Прекращено судебный штраф
  dismissalOther: number; // Прекращено по другим основаниям
  coerciveMeasures: number; // Принудительные меры к невменяемым
}

interface ClauseChronologyByResultProps {
  clauseNumber: number;
  years: Year[];
}

const ClauseChronologyByResultTable: React.FC<ClauseChronologyByResultProps> = ({
  clauseNumber,
  years,
}: ClauseChronologyByResultProps) => {
  const { t } = useLocale();

  const tables = [
    {
      title: t("Все года"),
      columns: [
        { title: t("Год"), key: "1" },
        { title: t("Всего осуждено"), key: "2" },
        { title: t("Оправдано"), key: "3" },
        {
          title: t(
            "Прекращено за отсутствием события, состава, непричастности к преступлению"
          ),
          key: "4",
        },
        { title: t("Прекращено по амнистии"), key: "5" },
        { title: t("Прекращено в связи с деятельным раскаянием"), key: "6" },
        { title: t("Прекращено за примирением"), key: "7" },
        { title: t("Судебный штраф"), key: "8" },
        { title: t("Прекращено по другим основаниям"), key: "9" },
        { title: t("Принудительные меры к невменяемым"), key: "10" },
      ],
      rows: years.map((y) => ({
        key: y.year,
        values: [
          { key: "1", value: y.year },
          { key: "2", value: y.totalConvicted },
          { key: "3", value: y.totalAcquittal },
          { key: "4", value: y.dismissalAbsenceOfEvent },
          { key: "5", value: y.dismissalAmnesty },
          { key: "6", value: y.dismissalRepentance },
          { key: "7", value: y.dismissalReconciliation },
          { key: "8", value: y.dismissalCourtFine },
          { key: "9", value: y.dismissalOther },
          { key: "10", value: y.coerciveMeasures },
        ],
      })),
    },
  ];

  return (
    <Table
      isEqualWidth
      isColored
      title={
        <T message="Динамика числа осужденных по основному составу. Основные параметры." />
      }
      downloadFilename={`${clauseNumber}-chronology-by-result`}
      iframePath={getClauseLink(
        clauseNumber,
        undefined,
        "parts",
        "iframe-table-chronology-by-result"
      )}
      isNotPaddedLeft
      tables={tables}
    />
  );
};

export default ClauseChronologyByResultTable;
