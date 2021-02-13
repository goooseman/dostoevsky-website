import React, { PureComponent } from "react";
import PercentageBar from "src/components/charts/PercentageBar";
import { getClauseLink } from "src/config/routes";
import { withLocale, WithLocale } from "react-targem";

const byResultLabels = [
  "осуждeнных",
  "оправданных",
  "прекращeнных",
  "принудительное лечение",
];

interface PartsByResultChartProps extends WithLocale {
  isIframeMode?: boolean;
  clauseNumber: number;
  year: number;
  parts: {
    part: string;
    totalConvicted: number;
    totalAcquittal: number;
    totalDismissal: number;
    coerciveMeasures: number;
  }[];
}

class PartsByResultChart extends PureComponent<PartsByResultChartProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts, isIframeMode, locale, t } = this.props;

    return (
      <PercentageBar
        title={`Чем закончились дела, дошедшие до суда по каждой части статьи ${clauseNumber}`}
        labels={byResultLabels}
        downloadFilename={`${clauseNumber}-${year}-parts-by-result`}
        isIframeMode={isIframeMode}
        groups={parts
          .slice()
          .reverse()
          .map((p) => ({
            title: p.part,
            values: [
              p.totalConvicted,
              p.totalAcquittal,
              p.totalDismissal,
              p.coerciveMeasures,
            ],
          }))}
        tooltipDescription={{
          [t("Состав")]: `${clauseNumber} ${t("основной состав")}`,
          [t("Год")]: `${year}`,
          [t("Число человек")]: "%%",
        }}
        iframePath={getClauseLink(
          locale,
          clauseNumber.toString(),
          year.toString(),
          "parts",
          "iframe-parts-by-result"
        )}
      />
    );
  }
}

export default withLocale(PartsByResultChart);
