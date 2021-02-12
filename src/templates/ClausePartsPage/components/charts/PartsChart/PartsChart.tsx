import React, { PureComponent } from "react";
import PercentageBar from "src/components/charts/PercentageBar";
import { getClauseLink } from "src/config/routes";
import { withLocale, WithLocale } from "react-targem";

interface PartsProps extends WithLocale {
  isIframeMode?: boolean;
  clauseNumber: number;
  year: number;
  parts: {
    part: string;
    totalConvicted: number;
  }[];
}

class Parts extends PureComponent<PartsProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts, isIframeMode, locale } = this.props;

    return (
      <PercentageBar
        labels={parts.map((p) => p.part)}
        downloadFilename={`${clauseNumber}-${year}-parts`}
        title={`СРАВНЕНИЕ ЧАСТЕЙ МЕЖДУ СОБОЙ: СКОЛЬКО ЧЕЛОВЕК ОСУЖДЕНО ПО КАЖДОЙ ЧАСТИ СТАТЬИ ${clauseNumber} ПО ОСНОВНОМУ СОСТАВУ`}
        groups={[
          {
            title: "",
            values: parts.map((p) => p.totalConvicted),
          },
        ]}
        isIframeMode={isIframeMode}
        tooltipDescription={{
          Состав: `${clauseNumber} основной состав`,
          Год: `${year}`,
          "Число человек": "%%",
        }}
        iframePath={getClauseLink(
          locale,
          clauseNumber.toString(),
          year.toString(),
          "parts",
          "iframe-parts"
        )}
      />
    );
  }
}

export default withLocale(Parts);
