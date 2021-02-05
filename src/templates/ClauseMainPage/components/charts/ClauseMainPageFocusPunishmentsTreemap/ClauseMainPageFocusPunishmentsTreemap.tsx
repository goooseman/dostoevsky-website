import React from "react";
import Treemap from "src/components/charts/Treemap";
import { useLocale } from "react-targem";
import { getClauseLink } from "src/config/routes";

interface ClauseMainPageFocusPunishmentsTreemapProps {
  clauseNumber: number;
  year: number;
  primarySuspended: number;
  primaryImprisonment: number;
  primaryFine: number;
  primaryCorrectionalLabour: number;
  isIframeMode?: boolean;
}

const ClauseMainPageFocusPunishmentsTreemap: React.FC<ClauseMainPageFocusPunishmentsTreemapProps> = ({
  clauseNumber,
  year,
  primarySuspended,
  primaryImprisonment,
  primaryFine,
  primaryCorrectionalLabour,
  isIframeMode,
}: ClauseMainPageFocusPunishmentsTreemapProps) => {
  const { t, locale } = useLocale();
  return (
    <Treemap
      isIframeMode={isIframeMode}
      title={t(
        `Наказания для подсудимых по статье ${clauseNumber} в ${year} году`
      )}
      data={[
        {
          value: primarySuspended,
          label: "условное осуждение к лишению свободы",
        },
        { value: primaryImprisonment, label: "лишение свободы" },
        {
          value: primaryFine,
          label: "штраф",
        },
        {
          value: primaryCorrectionalLabour,
          label: "исправительные работы",
        },
      ]}
      width={625}
      height={392}
      clauseNumber={clauseNumber}
      year={year}
      downloadFilename={`${clauseNumber}-${year}-treemap-by-punisment`}
      iframePath={getClauseLink(
        locale,
        clauseNumber,
        year,
        "main",
        "iframe-focus-treemap-by-punisment"
      )}
    />
  );
};

export default ClauseMainPageFocusPunishmentsTreemap;
