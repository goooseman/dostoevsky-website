import React from "react";
import Bar from "src/components/charts/Bar";
import { getClauseLink } from "src/config/routes";
import { T, useLocale } from "react-targem";

interface ChronologyConvictedDynamicsProps {
  isIframeMode?: boolean;
  clauseNumber: number;
  years: {
    year: string;

    primaryImprisonment: number; // Лишение свободы
    primarySuspended: number; // Условное осуждение к лишению свободы
    primaryCommunityService: number; // Обязательные работы
    primaryForcedLabour: number; // Принудительные работы
    primaryCorrectionalLabour: number; // Исправительные работы
    primaryFine: number; // Штраф
    coerciveMeasures: number; // Принудительные меры к невменяемым
    primaryOther: number; // Условное осуждение к иным мерам
  }[];
}

const ChronologyConvictedDynamics: React.SFC<ChronologyConvictedDynamicsProps> = (
  props: ChronologyConvictedDynamicsProps
) => {
  const { clauseNumber, years, isIframeMode } = props;
  const { t } = useLocale();

  const getTooltipDescription = (title: string) => ({
    [t("Состав")]: "Основной состав",
    [t("Наказание")]: title,
    [t("Число человек")]: "%%",
  });

  const charts = [
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryImprisonment),
        },
      ],
      title: t("Лишение свободы"),
      tooltipDescription: getTooltipDescription(t("Лишение свободы")),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primarySuspended),
        },
      ],
      title: t("условное осуждение к лишению свободы"),
      tooltipDescription: getTooltipDescription(
        t("условное осуждение к лишению свободы")
      ),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryCommunityService),
        },
      ],
      title: t("обязательные работы"),
      tooltipDescription: getTooltipDescription(t("обязательные работы")),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryForcedLabour),
        },
      ],
      title: t("принудительные работы"),
      tooltipDescription: getTooltipDescription(t("принудительные работы")),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryCorrectionalLabour),
        },
      ],
      title: t("исправительные работы"),
      tooltipDescription: getTooltipDescription(t("исправительные работы")),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryFine),
        },
      ],
      title: t("штраф"),
      tooltipDescription: getTooltipDescription(t("штраф")),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.coerciveMeasures),
        },
      ],
      title: t("принудительное лечение"),
      tooltipDescription: getTooltipDescription(t("принудительное лечение")),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryOther),
        },
      ],
      title: t("условное осуждение к иным мерам"),
      tooltipDescription: getTooltipDescription(
        t("условное осуждение к иным мерам")
      ),
    },
  ];

  return (
    <Bar
      isIframeMode={isIframeMode}
      title={<T message="Динамика наказаний по статье с 2009 по 2019 гг." />}
      labels={years.map((y) => y.year)}
      downloadFilename={`${clauseNumber}-punishment-dynamics`}
      charts={charts}
      areLabelsRotated
      iframePath={getClauseLink(
        clauseNumber.toString(),
        undefined,
        "chronology",
        "iframe-punishment-dynamics"
      )}
    />
  );
};

export default ChronologyConvictedDynamics;
