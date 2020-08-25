import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import classes from "./ClausePartsPage.module.css";
import cn from "clsx";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import PartsChart from "./charts/PartsChart";
import PartsByResultChart from "./charts/PartsByResultChart";
import PartsByPunishment from "./charts/PartsByPunishment";
import ClausePartsTable from "./components/ClausePartsTable";

export type ClausePartsPageViewMode =
  | "page"
  | "table"
  | "iframe-parts"
  | "iframe-parts-by-result"
  | "iframe-parts-by-punishment"
  | "iframe-table-parts";

export interface ClausePartsPageProps {
  clauseNumber: number;
  year: number;
  view: ClausePartsPageViewMode;
  parts: {
    part: string;
    name: string;
    count: number;
    byResult: {
      convictedCount: number;
      acquittalCount: number;
      dismissalCount: number;
      compulsoryTreatmentCount: number; // TODO rename
      unfinishedOffenceCount: number; // Преступление не является оконченным (приготовление, покушение)
      addTotalPersonsCount: number; // Доп. квалификация: осуждено по числу лиц
      addTotalOffencesCount: number; // Доп. квалификация: осуждено по количеству составов преступлений
      addAcquittalPersonsCount: number; // Доп. квалификация: оправдано по числу лиц
      addAcquittalOffencesCount: number; // Доп. квалификация: оправдано по количеству составов преступлений
      noCrimeSelfDefenceCount: number; // Обстоятельства, исключающие преступность: необходимая оборона
      noCrimeNecessityCount: number; // Обстоятельства, исключающие преступность: крайняя необходимость
      noCrimeOtherCount: number; // Обстоятельства, исключающие преступность, предусмотренные статьями 38, 40 - 42 УК РФ
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
      addDisqualificationCount: number; // Дополнительное наказание: лишение права занимать определенные должности или заниматься определенной деятельностью
      addFineCount: number; // Дополнительное наказание: штраф
      addTitlesWithdrawCount: number; // Дополнительное наказание: лишение специального, воинского или почетного звания, классного чина и государственных наград
      addRestrainCount: number; // Дополнительное наказание: ограничение свободы
    };
    byDismissal: {
      dismissalAbsenceOfEventCount: number; // Прекращено за отсутствием события, состава, непричастностью к преступлению
      dismissalAmnestyCount: number; // Прекращено по амнистии
      dismissalReconciliationCount: number; // Прекращено за примирением с потерпевшим
      dismissalRepentanceCount: number; // Прекращено в связи с деятельным раскаянием
      dismissalCourtFinеCount: number; // Прекращено судебный штраф
      dismissalOtherCount: number; // Прекращено по другим основаниям
      dismissalRepentance2Count: number; // Прекращено по другим основаниям: на основании примечаний к статьям УК РФ (в связи с деятельным раскаянием ч. 2 ст. 28 УПК РФ)'
      addDismissalPersonsCount: number; // Доп. квалификация: прекращено по числу лиц
      addDismissalOffencesCount: number; // Доп. квалификация: прекращено по количеству составов преступлений
      addDismissalOtherPersonsCount: number; // Доп. квалификация: прекращено по иным основаниям по числу лиц
      addDismissalOtherOffencesCount: number; // Доп. квалификация: прекращено по иным основаниям по количеству составов преступлений
      // addUnfitToPleadPersonsCount: number; // Доп. квалификация: признано невменяемыми по числу лиц
      // addUnfitToPleadOffencesCount: number; // Доп. квалификация: признано невменяемыми по количеству составов преступлений
    };
  }[];
}

class ClausePartsPage extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, view, parts } = this.props;

    if (view === "iframe-parts") {
      return <PartsChart {...this.props} isIframeMode />;
    }

    if (view === "iframe-parts-by-result") {
      return <PartsByResultChart {...this.props} isIframeMode />;
    }

    if (view === "iframe-parts-by-punishment") {
      return <PartsByPunishment {...this.props} isIframeMode />;
    }

    if (view === "iframe-table-parts") {
      return <ClausePartsTable {...this.props} />;
    }

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Части"
        pageType="parts"
        headerChildren={this.renderHeaderChildren()}
        hasParts={parts.length > 1}
      >
        {view === "table" ? <ClausePartsTable {...this.props} /> : null}
        {view === "page" ? (
          <div className={cn(classes.charts)}>
            <div className={cn(classes.chartContainer)}>
              <PartsChart {...this.props} />
            </div>
            <div className={cn(classes.chartContainer)}>
              <PartsByResultChart {...this.props} />
            </div>
            <div className={cn(classes.chartContainer)}>
              <PartsByPunishment {...this.props} />
            </div>
          </div>
        ) : null}
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
