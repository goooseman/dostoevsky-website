import React, { PureComponent } from "react";
import PercentageBar from "src/components/charts/PercentageBar";
import type { ClausePartsPageProps } from "../../ClausePartsPage";
import { getClauseLink } from "src/config/routes";

const byResultLabels = [
  "осуждённых",
  "оправданных",
  "прекращённых",
  "принудительное лечение",
];

interface PartsByResultChartProps extends ClausePartsPageProps {
  isIframeMode?: boolean;
}

class PartsByResultChart extends PureComponent<PartsByResultChartProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts, isIframeMode } = this.props;

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
          Состав: `${clauseNumber} основной состав`,
          Год: `${year}`,
          "Число человек": "%%",
        }}
        iframePath={getClauseLink(
          clauseNumber.toString(),
          year.toString(),
          "parts",
          "iframe-parts-by-result"
        )}
      />
    );
  }
}

export default PartsByResultChart;
