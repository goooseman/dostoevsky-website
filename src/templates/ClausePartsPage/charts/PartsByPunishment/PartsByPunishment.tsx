import React, { PureComponent } from "react";
import Bar from "src/components/charts/Bar";
import type { ClausePartsPageProps } from "../../ClausePartsPage";

const byPunishmentLabels = [
  "пожизненное лишение свободы",
  "условное осуждение к лишению свободы",
  "арест",
  "ограничение свободы",
  "ограничение свободы/ограничение по военной службе, содержание в дисциплинарной воинской части",
  "исправительные работы",
  "обязательные работы",
  "принудительные работы",
  "штраф",
  "лишение права занимать определенные должности",
  "условное осуждение к иным мерам",
  "содержание в дисциплинарной воинской части",
  "ограничение по военной службе",
  "лишение свободы",
];

class PartsByPunishment extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts } = this.props;

    return (
      <Bar
        title="Виды наказаний по частям статьи 282"
        labels={byPunishmentLabels}
        downloadFilename={`${clauseNumber}-${year}-parts-by-punishment`}
        groups={parts.map((p) => ({
          title: p.part,
          values: [
            p.byPunishment.primaryLifeSentenceCount,
            p.byPunishment.primarySuspendedCount,
            p.byPunishment.primaryArrestCount,
            p.byPunishment.primaryRestrainCount,
            p.byPunishment.primaryRestrain2009Count,
            p.byPunishment.primaryCorrectionalLabourCount,
            p.byPunishment.primaryCommunityServiceCount,
            p.byPunishment.primaryForcedLabourCount,
            p.byPunishment.primaryFineCount,
            p.byPunishment.primaryDisqualificationCount,
            p.byPunishment.primaryOtherCount,
            p.byPunishment.primaryMilitaryDisciplinaryUnitCount,
            p.byPunishment.primaryRestrictionsInMilitaryServiceCount,
            p.byPunishment.primaryImprisonmentCount,
          ],
        }))}
      />
    );
  }
}

export default PartsByPunishment;
