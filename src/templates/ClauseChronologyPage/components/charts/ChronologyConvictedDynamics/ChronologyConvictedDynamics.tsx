import React from "react";
import LineChart from "src/components/charts/LineChart";
import { getClauseLink } from "src/config/routes";
import { T, useLocale } from "react-targem";

interface ChronologyConvictedDynamicsProps {
  isIframeMode?: boolean;
  clauseNumber: number;
  years: {
    year: string;
    totalConvicted: number; // Всего осуждено
  }[];
}

const ChronologyConvictedDynamics: React.SFC<ChronologyConvictedDynamicsProps> = (
  props: ChronologyConvictedDynamicsProps
) => {
  const { clauseNumber, years, isIframeMode } = props;
  const { t } = useLocale();

  return (
    <LineChart
      isIframeMode={isIframeMode}
      title={<T message="Динамика числа осужденных по основному составу" />}
      labels={years.map((y) => y.year)}
      downloadFilename={`${clauseNumber}-convicted-dynamics`}
      tooltipDescription={{
        Состав: t("{{ clauseNumber }} Основной состав", { clauseNumber }),
        Год: "%label%",
        [t("Число человек")]: "%%",
      }}
      groups={[
        {
          title: t("{{ clauseNumber }} Основной состав", { clauseNumber }),
          values: years.map((y) => y.totalConvicted),
        },
      ]}
      iframePath={getClauseLink(
        clauseNumber.toString(),
        undefined,
        "chronology",
        "iframe-convicted-dynamics"
      )}
    />
  );
};

export default ChronologyConvictedDynamics;
