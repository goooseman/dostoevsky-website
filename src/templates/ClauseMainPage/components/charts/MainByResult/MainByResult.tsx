import React from "react";
import DonutChart from "src/components/charts/DonutChart";
import { getClauseLink } from "src/config/routes";
import { T, useLocale } from "react-targem";

interface MainByResultProps {
  isIframeMode?: boolean;
  clauseNumber: number;
  year: number;

  totalConvicted: number; // Всего осуждено
  totalAcquittal: number; // Оправдано
  totalDismissal: number; // Прекращено
  coerciveMeasures: number; // Принудительные меры к невменяемым

  addTotalPersons: number; // Доп. квалификация: осуждено по числу лиц
  addTotalOffences: number; // Доп. квалификация: осуждено по количеству составов преступлений
  addAcquittalPersons: number; // Доп. квалификация: оправдано по числу лиц
  addAcquittalOffences: number; // Доп. квалификация: оправдано по количеству составов преступлений
  addDismissalPersons: number; // Доп. квалификация: прекращено по числу лиц
  addDismissalOffences: number; // Доп. квалификация: прекращено по количеству составов преступлений
  addDismissalOtherPersons: number; // Доп. квалификация: прекращено по иным основаниям по числу лиц
  addDismissalOtherOffences: number; // Доп. квалификация: прекращено по иным основаниям по количеству составов преступлений
  addUnfitToPleadPersons: number; // Доп. квалификация: признано невменяемыми по числу лиц
  addUnfitToPleadOffences: number; // Доп. квалификация: признано невменяемыми по количеству составов преступлений
}

const MainByResult: React.SFC<MainByResultProps> = ({
  clauseNumber,
  year,
  isIframeMode,
  ...p
}: MainByResultProps) => {
  const { t } = useLocale();
  const labels = [
    t("прекращено дел в отношении человек"),
    t("оправданы"),
    t("осуждены"),
    t("принудительное лечение"),
  ];

  const tooltipDescription = {
    [t("Состав")]: t("Основной состав"),
    [t("Наказание")]: "%label%",
    [t("Число человек")]: "%%",
  } as const;

  return (
    <DonutChart
      isIframeMode={isIframeMode}
      title={
        <T
          message="Чем закончились дела по статье {{ clauseNumber }}, дошедшие до суда (основной состав)"
          scope={{ clauseNumber }}
        />
      }
      charts={[
        {
          title: t("основной состав"),
          labels,
          groups: [
            p.totalDismissal,
            p.totalAcquittal,
            p.totalConvicted,
            p.coerciveMeasures,
          ],
          tooltipDescription,
        },
        {
          title: t("доп. состав (по числу лиц)"),
          labels,
          groups: [
            p.addDismissalPersons + p.addDismissalOtherPersons,
            p.addAcquittalPersons,
            p.addTotalPersons,
            p.addUnfitToPleadPersons,
          ],
          tooltipDescription,
        },
        {
          title: t("доп. состав (по количеству составов)"),
          labels,
          groups: [
            p.addDismissalOffences + p.addDismissalOtherOffences,
            p.addAcquittalOffences,
            p.addTotalOffences,
            p.addUnfitToPleadOffences,
          ],
          tooltipDescription,
        },
      ]}
      downloadFilename={`${clauseNumber}-${year}-by-result`}
      iframePath={getClauseLink(
        clauseNumber.toString(),
        year.toString(),
        "main",
        "iframe-by-result"
      )}
    />
  );
};
export default MainByResult;
