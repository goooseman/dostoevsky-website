import React from "react";
import PercentageBar from "src/components/charts/PercentageBar";
import { getClauseLink } from "src/config/routes";
import { useLocale } from "react-targem";

interface ClauseMainPageFocusTerminatedChart {
  clauseNumber: number;
  year: number;
  addDismissalPersons: number;
  addDismissalOtherOffences: number;
  coerciveMeasures: number;
}

const ClauseMainPageFocusTerminatedChart: React.FC<ClauseMainPageFocusTerminatedChart> = ({
  clauseNumber,
  year,
  addDismissalPersons,
  addDismissalOtherOffences,
  coerciveMeasures,
}: ClauseMainPageFocusTerminatedChart) => {
  const { t, locale } = useLocale();
  const statsOnTermination = [
    {
      label: t(
        "Дела прекращены за отсутствием состава, события преступления, непричастностью к преступлению (число лиц)"
      ),
      value: addDismissalPersons,
    },
    {
      label: t("Дела прекращены по иным основаниям (число лиц)"),
      value: addDismissalOtherOffences,
    },
    {
      label: t("Принудительное лечение"),
      value: coerciveMeasures,
    },
  ].sort((a, b) => b.value - a.value);
  return (
    <PercentageBar
      isSeparateLabels
      centerTitle
      labels={statsOnTermination.map((s) => s.label)}
      downloadFilename={`${clauseNumber}-${year}-parts`}
      title={t(`Статистика прекращения дел по статье в ${year} году`)}
      groups={[
        {
          title: "",
          values: statsOnTermination.map((s) => s.value),
        },
      ]}
      isIframeMode={false}
      tooltipDescription={{
        Состав: `${clauseNumber} основной состав`,
        Меры: "^^",
        "Число человек": "%%",
      }}
      iframePath={getClauseLink(
        locale,
        clauseNumber.toString(),
        year.toString(),
        "main",
        "iframe-focus-by-terminated"
      )}
    />
  );
};

export default ClauseMainPageFocusTerminatedChart;
