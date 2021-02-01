import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import classes from "./ClausePartsPage.module.css";
import cn from "clsx";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import PartsChart from "./components/charts/PartsChart";
import PartsByResultChart from "./components/charts/PartsByResultChart";
import PartsByPunishment from "./components/charts/PartsByPunishment";
import ClausePartsTable from "./components/ClausePartsTable";
import SpoilerText from "src/components/SpoilerText";
import { formatNumber } from "src/utils/numbers";
import T from "src/components/T";
import { Helmet } from "react-helmet";
import { withLocale, WithLocale } from "react-targem";

export type ClausePartsPageViewMode =
  | "page"
  | "table"
  | "iframe-parts"
  | "iframe-parts-by-result"
  | "iframe-parts-by-punishment"
  | "iframe-table-parts";

export interface Part {
  part: string;
  name: string;
  totalConvicted: number; // Всего осуждено
  totalAcquittal: number; // Оправдано
  totalDismissal: number; // Прекращено
  coerciveMeasures: number; // Принудительные меры к невменяемым
  unfinishedOffence: number; // Преступление не является оконченным (приготовление, покушение)
  addTotalPersons: number; // Доп. квалификация: осуждено по числу лиц
  addTotalOffences: number; // Доп. квалификация: осуждено по количеству составов преступлений
  addAcquittalPersons: number; // Доп. квалификация: оправдано по числу лиц
  addAcquittalOffences: number; // Доп. квалификация: оправдано по количеству составов преступлений
  noCrimeSelfDefence: number; // Обстоятельства, исключающие преступность: необходимая оборона
  noCrimeNecessity: number; // Обстоятельства, исключающие преступность: крайняя необходимость
  noCrimeOther: number; // Обстоятельства, исключающие преступность, предусмотренные статьями 38, 40 - 42 УК РФ

  primaryLifeSentence: number; // Пожизненное лишение свободы
  primarySuspended: number; // Условное осуждение к лишению свободы
  primaryArrest: number; // Арест
  primaryRestrain: number; // Ограничение свободы
  primaryRestrain2009: number; // Ограничение свободы/ограничение по военной службе, содержание в дисциплинарной воинской части
  primaryCorrectionalLabour: number; // Исправительные работы
  primaryCommunityService: number; // Обязательные работы
  primaryForcedLabour: number; // Принудительные работы
  primaryFine: number; // Штраф
  primaryDisqualification: number; // Лишение права занимать определенные должности или заниматься определенной деятельностью
  primaryOther: number; // Условное осуждение к иным мерам
  primaryMilitaryDisciplinaryUnit: number; // Содержание в дисциплинарной воинской части
  primaryRestrictionsInMilitaryService: number; // Ограничение по военной службе
  primaryImprisonment: number; // Лишение свободы
  addDisqualification: number; // Дополнительное наказание: лишение права занимать определенные должности или заниматься определенной деятельностью
  addFine: number; // Дополнительное наказание: штраф
  addTitlesWithdraw: number; // Дополнительное наказание: лишение специального, воинского или почетного звания, классного чина и государственных наград
  addRestrain: number; // Дополнительное наказание: ограничение свободы

  dismissalAbsenceOfEvent: number; // Прекращено за отсутствием события, состава, непричастностью к преступлению
  dismissalAmnesty: number; // Прекращено по амнистии
  dismissalReconciliation: number; // Прекращено за примирением с потерпевшим
  dismissalRepentance: number; // Прекращено в связи с деятельным раскаянием
  dismissalCourtFine: number; // Прекращено судебный штраф
  dismissalOther: number; // Прекращено по другим основаниям
  dismissalRepentance2: number; // Прекращено по другим основаниям: на основании примечаний к статьям УК РФ (в связи с деятельным раскаянием ч. 2 ст. 28 УПК РФ)'
  addDismissalPersons: number; // Доп. квалификация: прекращено по числу лиц
  addDismissalOffences: number; // Доп. квалификация: прекращено по количеству составов преступлений
  addDismissalOtherPersons: number; // Доп. квалификация: прекращено по иным основаниям по числу лиц
  addDismissalOtherOffences: number; // Доп. квалификация: прекращено по иным основаниям по количеству составов преступлений
  // addUnfitToPleadPersons: number; // Доп. квалификация: признано невменяемыми по числу лиц
  // addUnfitToPleadOffences: number; // Доп. квалификация: признано невменяемыми по количеству составов преступлений
}

export interface ClausePartsPageProps extends WithLocale {
  clauseNumber: number;
  year: number;
  view: ClausePartsPageViewMode;
  parts: Part[];
}

class ClausePartsPage extends PureComponent<ClausePartsPageProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, view, parts, t } = this.props;

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
        title={<T message="Части" />}
        pageType="parts"
        headerChildren={this.renderHeaderChildren()}
        hasParts={parts.length > 0}
      >
        {view === "table" ? (
          <>
            <Helmet defer={false}>
              <title>
                {`${t("Статья")} ${clauseNumber} | ${t("Части")} | ${t(
                  "Таблица"
                )}`}
              </title>
              <meta
                name="description"
                content={t("Информация по частям статьи в виде таблицы")}
              />
            </Helmet>
            <ClausePartsTable {...this.props} />
          </>
        ) : null}
        {view === "page" ? (
          <div className={cn(classes.charts)}>
            <Helmet defer={false}>
              <title>
                {`${t("Статья")} ${clauseNumber} | ${t("Части")} | ${t(
                  "Чарты"
                )}`}
              </title>
              <meta
                name="description"
                content={t("Информация по частям статьи в виде чартов")}
              />
            </Helmet>
            <div className={cn(classes.chartContainer)}>
              <SpoilerText
                text={parts.map((p, i) =>
                  this.getPartText(p, i + 1, parts.length)
                )}
              />
            </div>
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

  private getPartText = (part: Part, partIndex: number, partsCount: number) => {
    const { year, clauseNumber } = this.props;
    return (
      <span key={`${clauseNumber}-${partIndex}`}>
        {partIndex === 1 ? (
          <T
            message="В {{ year }} году по части {{ partIndex }} статьи {{ clauseNumber }} были осуждены по основному составу {{ count }} человек"
            messagePlural="В {{ year }} году по части {{ partIndex }} статьи {{ clauseNumber }} были осуждены по основному составу {{ count }} человека"
            scope={{ year, clauseNumber, partIndex }}
            count={part.totalConvicted}
          />
        ) : (
          <T
            message="По части {{ partIndex }} статьи {{ clauseNumber }} были осуждены по основному составу {{ count }} человек"
            messagePlural="По части {{ partIndex }} статьи {{ clauseNumber }} были осуждены по основному составу {{ count }} человека"
            scope={{ clauseNumber, partIndex }}
            count={part.totalConvicted}
          />
        )}
        {". "}
        <T
          message="Из них {{ count }} ({{ primarySuspendedPercent }}%) был приговорен к лишению свободы условно"
          messagePlural="Из них {{ count }} ({{ primarySuspendedPercent }}%) были приговорены к лишению свободы условно"
          scope={{
            primarySuspendedPercent: formatNumber(
              part.primarySuspended / (part.totalConvicted / 100)
            ),
          }}
          count={part.primarySuspended}
        />
        {", "}
        <T
          message="еще {{ count }} ({{ primaryRestrainPercent }}%) получил реальные сроки"
          messagePlural="еще {{ count }} ({{ primaryRestrainPercent }}%) получили реальные сроки"
          count={part.primaryRestrain}
          scope={{
            primaryRestrainPercent: formatNumber(
              part.primaryRestrain / (part.totalConvicted / 100)
            ),
          }}
        />
        {". "}
        <T
          message="Оправдан {{ count }} человек"
          messagePlural="Оправданы {{ count }} человека"
          count={part.totalAcquittal}
        />
        {". "}
        <T
          message="Прекращены дела в отношении <b>{{ count }}</b> человека"
          messagePlural="Прекращены дела в отношении <b>{{ count }}</b> человек"
          count={part.totalDismissal}
        />
        {". "}
        <T
          message="По дополнительному составу осуждены <b>{{ count }}</b> человек"
          messagePlural="По дополнительному составу осуждены <b>{{ count }}</b> человека"
          count={part.totalDismissal}
        />
        {"."}
        {partsCount !== partIndex ? (
          <>
            <br />
            <br />
          </>
        ) : null}
      </span>
    );
  };

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

export default withLocale(ClausePartsPage);
