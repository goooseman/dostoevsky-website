import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import classes from "./ClauseChronologyPage.module.css";
import cn from "clsx";
import ChronologyConvictedDynamics from "./components/charts/ChronologyConvictedDynamics";
import ChronologyPunishmentDynamics from "./components/charts/ChronologyPunishmentDynamics";
import { T } from "react-targem";

export type ClauseChronologyPageViewMode =
  | "page"
  | "table"
  | "iframe-convicted-dynamics"
  | "iframe-punishment-dynamics"
  | "iframe-table-chronology";

interface Year {
  year: string;
  totalConvicted: number; // Всего осуждено

  primaryImprisonment: number; // Лишение свободы
  primarySuspended: number; // Условное осуждение к лишению свободы
  primaryCommunityService: number; // Обязательные работы
  primaryForcedLabour: number; // Принудительные работы
  primaryCorrectionalLabour: number; // Исправительные работы
  primaryFine: number; // Штраф
  coerciveMeasures: number; // Принудительные меры к невменяемым
  primaryOther: number; // Условное осуждение к иным мерам

  totalAcquittal: number; // Оправдано
  dismissalAbsenceOfEvent: number; // Прекращено за отсутствием события, состава, непричастностью к преступлению
  dismissalAmnesty: number; // Прекращено по амнистии
  dismissalRepentance: number; // Прекращено в связи с деятельным раскаянием
  dismissalReconciliation: number; // Прекращено за примирением с потерпевшим
  dismissalCourtFine: number; // Прекращено судебный штраф
  dismissalOther: number; // Прекращено по другим основаниям
}

export interface ClauseChronologyPageProps {
  clauseNumber: number;
  view: ClauseChronologyPageViewMode;
  partsCount: number;
  years: Year[];
}

class ClauseChronologyPage extends PureComponent<ClauseChronologyPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, view, partsCount } = this.props;

    if (view === "iframe-convicted-dynamics") {
      return <ChronologyConvictedDynamics {...this.props} isIframeMode />;
    }

    if (view === "iframe-punishment-dynamics") {
      return <ChronologyPunishmentDynamics {...this.props} isIframeMode />;
    }

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        title={<T message="Хронология" />}
        pageType="parts"
        hasParts={partsCount > 1}
      >
        {view === "page" ? (
          <div className={cn(classes.charts)}>
            <div className={cn(classes.chartContainer)}>
              <T message="На этой странице мы сравнили ключевые показатели по статье за период с 2009 по 2019 годы. Полноценных данных до 2009 года в открытом доступе не существует: Судебный департамент Верховного суда начал публиковать сводную статистику по рассмотрению судами уголовных дел после появления соответствующего закона и регламента в 2008 году." />
            </div>
            <div className={cn(classes.chartContainer)}>
              <ChronologyConvictedDynamics {...this.props} />
            </div>
            <div
              className={cn(
                classes.chartContainer,
                classes.chartContainerFullWidth
              )}
            >
              <ChronologyPunishmentDynamics {...this.props} />
            </div>
          </div>
        ) : null}
      </ClausePageLayout>
    );
  }
}

export default ClauseChronologyPage;
