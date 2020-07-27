import React, { PureComponent } from "react";
import PercentageBar from "src/components/charts/PercentageBar";
import type { ClausePartsPageProps } from "../../ClausePartsPage";

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
              p.byResult.convictedCount,
              p.byResult.acquittalCount,
              p.byResult.dismissalCount,
              p.byResult.compulsoryTreatmentCount,
            ],
          }))}
        tooltipDescription={{
          Состав: `${clauseNumber} основной состав`,
          Год: `${year}`,
          "Число человек": "%%",
        }}
      />
    );
  }
}

export default PartsByResultChart;
