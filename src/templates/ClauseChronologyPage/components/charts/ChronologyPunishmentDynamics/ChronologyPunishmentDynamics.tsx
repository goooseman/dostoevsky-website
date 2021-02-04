import React from "react";
import Bar from "src/components/charts/Bar";
import { getClauseLink } from "src/config/routes";
import { T, useLocale } from "react-targem";

interface ChronologyConvictedDynamicsProps {
  isIframeMode?: boolean;
  clauseNumber: number;
  years: {
    year: number;

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
  const { t, locale } = useLocale();

  const getTooltipDescription = (title: string) => ({
    [t("Состав")]: "Основной состав",
    [t("Наказание")]: title,
    [t("Число человек")]: "%%",
  });

  const labels = years.map((y) => y.year.toString());

  const charts = [
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryImprisonment),
        },
      ],
      title: t("Лишение свободы"),
      labels,
      tooltipDescription: getTooltipDescription(t("Лишение свободы")),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primarySuspended),
        },
      ],
      labels,
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
      labels,
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
      labels,
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
      labels,
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
      labels,
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
      labels,
      title: t("Принудительные меры к невменяемым"),
      tooltipDescription: getTooltipDescription(
        t("Принудительные меры к невменяемым")
      ),
    },
    {
      groups: [
        {
          title: t("Основной состав"),
          values: years.map((y) => y.primaryOther),
        },
      ],
      labels,
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
      downloadFilename={`${clauseNumber}-punishment-dynamics`}
      charts={charts}
      areLabelsRotated
      chartType="dynamicsPunishment"
      iframePath={getClauseLink(
        locale,
        clauseNumber.toString(),
        undefined,
        "chronology",
        "iframe-punishment-dynamics"
      )}
    />
  );
};

export default ChronologyConvictedDynamics;
