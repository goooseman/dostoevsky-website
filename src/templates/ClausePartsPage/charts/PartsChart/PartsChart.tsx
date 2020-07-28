import React, { PureComponent } from "react";
import PercentageBar from "src/components/charts/PercentageBar";
import type { ClausePartsPageProps } from "../../ClausePartsPage";
import { getClauseLink } from "src/config/routes";

interface PartsProps extends ClausePartsPageProps {
  isIframeMode?: boolean;
}

class Parts extends PureComponent<PartsProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts, isIframeMode } = this.props;

    return (
      <PercentageBar
        labels={parts.map((p) => p.part)}
        downloadFilename={`${clauseNumber}-${year}-parts`}
        title={`СРАВНЕНИЕ ЧАСТЕЙ МЕЖДУ СОБОЙ: СКОЛЬКО ЧЕЛОВЕК ОСУЖДЕНО ПО КАЖДОЙ ЧАСТИ СТАТЬИ ${clauseNumber} ПО ОСНОВНОМУ СОСТАВУ`}
        groups={[
          {
            title: "",
            values: parts.map((p) => p.count),
          },
        ]}
        isIframeMode={isIframeMode}
        tooltipDescription={{
          Состав: `${clauseNumber} основной состав`,
          Год: `${year}`,
          "Число человек": "%%",
        }}
        iframePath={getClauseLink(
          clauseNumber.toString(),
          year.toString(),
          "parts",
          "iframe-parts"
        )}
      />
    );
  }
}

export default Parts;
