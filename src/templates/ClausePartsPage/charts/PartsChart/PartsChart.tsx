import React, { PureComponent } from "react";
import PercentageBar from "src/components/charts/PercentageBar";
import type { ClausePartsPageProps } from "../../ClausePartsPage";

class Parts extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts } = this.props;

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
      />
    );
  }
}

export default Parts;
