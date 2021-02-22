import React from "react";
import Treemap from "src/components/charts/Treemap";
import { useLocale } from "react-targem";
import { getClauseLink } from "src/config/routes";

interface ClauseMainPageFocusTerminatedTreemapProps {
  clauseNumber: number;
  year: number;
  totalConvicted: number;
  totalAcquittal: number;
  totalDismissal: number;
  coerciveMeasures: number;
  isIframeMode?: boolean;
}

const ClauseMainPageFocusTerminatedTreemap: React.FC<ClauseMainPageFocusTerminatedTreemapProps> = ({
  clauseNumber,
  year,
  totalAcquittal,
  totalConvicted,
  totalDismissal,
  coerciveMeasures,
  isIframeMode,
}: ClauseMainPageFocusTerminatedTreemapProps) => {
  const { t, locale } = useLocale();
  return (
    <Treemap
      isIframeMode={isIframeMode}
      title={t(
        `Чем закончились дела по статье ${clauseNumber}, дошедшие до суда по основному составу в ${year} году`
      )}
      data={[
        {
          value: totalDismissal,
          label: "прекращено дел в отношении человек",
        },
        { value: totalConvicted, label: "осуждены" },
        {
          value: totalAcquittal,
          label: "оправданы",
        },
        {
          value: coerciveMeasures,
          label: "принудительное лечение",
        },
      ]}
      height={392}
      clauseNumber={clauseNumber}
      year={year}
      downloadFilename={`${clauseNumber}-${year}-treemap-by-terminated`}
      iframePath={getClauseLink(
        locale,
        clauseNumber,
        year,
        "main",
        "iframe-focus-treemap-by-terminated"
      )}
    />
  );
};

export default ClauseMainPageFocusTerminatedTreemap;
