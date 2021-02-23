import React from "react";
import LineChart from "src/components/charts/LineChart";
import { getClauseLink } from "src/config/routes";
import { T, useLocale } from "react-targem";

interface ChronologyConvictedDynamicsProps {
  isIframeMode?: boolean;
  clauseNumber: number;
  years: {
    year: number;
    totalConvicted: number; // Всего осуждено
  }[];
}

const ChronologyConvictedDynamics: React.SFC<ChronologyConvictedDynamicsProps> = (
  props: ChronologyConvictedDynamicsProps
) => {
  const { clauseNumber, years, isIframeMode } = props;
  const { t, locale } = useLocale();

  return (
    <LineChart
      isIframeMode={isIframeMode}
      title={t("Динамика числа осужденных по основному составу")}
      labels={years.map((y) => y.year.toString())}
      downloadFilename={`${clauseNumber}-convicted-dynamics`}
      tooltipDescription={{
        [t("Состав")]: t("{{ clauseNumber }} Основной состав", {
          clauseNumber,
        }),
        [t("Год")]: "%label%",
        [t("Число человек")]: "%%",
      }}
      groups={[
        {
          title: t("{{ clauseNumber }} Основной состав", { clauseNumber }),
          values: years.map((y) => y.totalConvicted),
        },
      ]}
      iframePath={getClauseLink(
        locale,
        clauseNumber.toString(),
        undefined,
        "chronology",
        "iframe-convicted-dynamics"
      )}
    />
  );
};

export default ChronologyConvictedDynamics;
