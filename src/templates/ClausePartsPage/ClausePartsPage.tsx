import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import classes from "./ClausePartsPage.module.css";
import cn from "clsx";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import PercentageBar from "src/components/charts/PercentageBar";
import Bar from "src/components/charts/Bar";

interface ClausePartsPageProps {
  clauseNumber: number;
  year: number;
  parts: {
    part: string;
    name: string;
    count: number;
    byResult: {
      convictedCount: number;
      acquittalCount: number;
      dismissalCount: number;
      compulsoryTreatmentCount: number;
    };
    byPunishment: {
      primaryLifeSentenceCount: number; // Пожизненное лишение свободы
      primarySuspendedCount: number; // Условное осуждение к лишению свободы
      primaryArrestCount: number; // Арест
      primaryRestrainCount: number; // Ограничение свободы
      primaryRestrain2009Count: number; // Ограничение свободы/ограничение по военной службе, содержание в дисциплинарной воинской части
      primaryCorrectionalLabourCount: number; // Исправительные работы
      primaryCommunityServiceCount: number; // Обязательные работы
      primaryForcedLabourCount: number; // Принудительные работы
      primaryFineCount: number; // Штраф
      primaryDisqualificationCount: number; // Лишение права занимать определенные должности или заниматься определенной деятельностью
      primaryOtherCount: number; // Условное осуждение к иным мерам
      primaryMilitaryDisciplinaryUnitCount: number; // Содержание в дисциплинарной воинской части
      primaryRestrictionsInMilitaryServiceCount: number; // Ограничение по военной службе
      primaryImprisonmentCount: number; // Лишение свободы
    };
  }[];
}

const byResultLabels = [
  "осуждённых",
  "оправданных",
  "прекращённых",
  "принудительное лечение",
];

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

class ClausePartsPage extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts } = this.props;

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Части"
        pageType="parts"
        headerChildren={this.renderHeaderChildren()}
      >
        {parts.length === 0 ? (
          <p>Нет данных</p>
        ) : (
          <div>
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

            <PercentageBar
              title={`Чем закончились дела, дошедшие до суда по каждой части статьи ${clauseNumber}`}
              labels={byResultLabels}
              downloadFilename={`${clauseNumber}-${year}-parts-by-result`}
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
            />

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
          </div>
        )}
      </ClausePageLayout>
    );
  }

  private renderHeaderChildren = () => {
    const { parts } = this.props;
    return (
      <Accordion isOpened={false}>
        {parts.map((p) => (
          <AccordionNode
            className={cn(classes.accordionPartItem)}
            key={p.name}
            title={p.part}
            variant="horizontal"
          >
            {p.name}
          </AccordionNode>
        ))}
      </Accordion>
    );
  };
}

export default ClausePartsPage;
