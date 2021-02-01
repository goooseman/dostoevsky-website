import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";
import classes from "./ClauseMainPage.module.css";
import cn from "clsx";
import { Counters, Counter } from "src/components/Counters";
import SpoilerText from "src/components/SpoilerText";
import { formatNumber } from "src/utils/numbers";
import MainByResult from "./components/charts/MainByResult";
import CommonMainResultsTable from "./components/tables/CommonMainResultsTable";
import CommonAddResultsTable from "./components/tables/CommonAddResultsTable";
import { Menu, MenuLink } from "src/components/Menu";
import { getClauseLink } from "src/config/routes";
import ClauseMainPageFocus from "./ClauseMainPageFocus";
import T from "src/components/T";
import ClauseMainPageFocusTable from "./ClauseMainPageFocusTable";
import { withLocale, WithLocale } from "react-targem";
import { Helmet } from "react-helmet";

export type ClausePartsPageViewMode =
  | "page"
  | "table"
  | "focus"
  | "focus-table"
  | "iframe-table-common-main-by-result"
  | "iframe-table-common-add-by-result"
  | "iframe-by-result"
  | "iframe-table-focus";

interface ClauseMainPageProps extends WithLocale {
  clauseNumber: number;
  year: number;
  partsCount: number;
  view: ClausePartsPageViewMode;

  total: number; // Прошли через суд (totalConvicted + dismissalAbsenceOfEvent + dismissalAmnesty + dismissalReconciliation + dismissalRepentance + dismissalCourtFine + dismissalOther + acquittal + noCrimeSelf-defence + noCrimeNecessity + noCrimeOther + coerciveMeasures)
  totalCases: number; // Случаев использования статьи (totalConvicted + addTotalOffences + dismissalAbsenceOfEvent + dismissalAmnesty + dismissalReconciliation + dismissalRepentance + dismissalCourtFine + dismissalOther + addDismissalOffences + addDismissalOtherOffences + acquittal + coerciveMeasures + noCrimeSelf-defence + noCrimeNecessity + noCrimeOther + exemption)

  totalConvicted: number; // Всего осуждено
  totalAcquittal: number; // Оправдано
  totalDismissal: number; // Прекращено
  coerciveMeasures: number; // Принудительные меры к невменяемым

  noCrimeNecessity: number; // Обстоятельства, исключающие преступность: крайняя необходимость
  noCrimeOther: number; // Обстоятельства, исключающие преступность, предусмотренные статьями 38, 40 - 42 УК РФ

  dismissalAmnesty: number; // Прекращено по амнистии
  noCrimeSelfDefence: number; // Прекращено как необходимая оборона

  nonRehabilitating: number; // По нереабилитирующим основаниям (dismissalAmnesty + dismissalReconciliation + dismissalRepentance + dismissalCourtFine + dismissalOther + addDismissalOtherOffences)
  primarySuspended: number; // Условное осуждение к лишению свободы
  primaryRestrain: number; // Ограничение свободы
  primaryImprisonment: number; //Лишение свободы
  primaryFine: number; //Штраф
  primaryCorrectionalLabour: number; //Исправительные работы

  addTotalPersons: number; // Доп. квалификация: осуждено по числу лиц
  addTotalOffences: number; // Доп. квалификация: осуждено по количеству составов преступлений
  addAcquittalPersons: number; // Доп. квалификация: оправдано по числу лиц
  addAcquittalOffences: number; // Доп. квалификация: оправдано по количеству составов преступлений
  addDismissalPersons: number; // Доп. квалификация: прекращено по числу лиц
  addDismissalOffences: number; // Доп. квалификация: прекращено по количеству составов преступлений
  addDismissalOtherPersons: number; // Доп. квалификация: прекращено по иным основаниям по числу лиц
  addDismissalOtherOffences: number; // Доп. квалификация: прекращено по иным основаниям по количеству составов преступлений
  addUnfitToPleadPersons: number; // Доп. квалификация: признано невменяемыми по числу лиц
  addUnfitToPleadOffences: number; // Доп. квалификация: признано невменяемыми по количеству составов преступлений
  unfinishedOffence: number; // Преступлений признано неоконченными

  totalAdd: number; // Дополнительное наказание: всего
  addDisqualification: number; // Дополнительное наказание: лишение права занимать определенные должности или заниматься определенной деятельностью
  addFine: number; // Дополнительное наказание: штраф
  addTitlesWithdraw: number; // Дополнительное наказание: лишение специального, воинского или почетного звания, классного чина и государственных наград
  addRestrain: number; // Дополнительное наказание: ограничение свободы

  primaryImprisonmentUnderLowerLimit: number; // Наказание назначено ниже низшего предела лишение свободы
  primaryImprisonment1: number; // до 1 года включительно
  primaryImprisonment1_2: number; // свыше 1 до 2 лет включительно
  primaryImprisonment1_3: number; // от 1 до 3 лет включительно
  primaryImprisonment2_3: number; // свыше 2 до 3 лет включительно
  primaryImprisonment3_5: number; // свыше 3 до 5 лет включительно
  primaryImprisonment5_8: number; // свыше 5 до 8 лет включительно
  primaryImprisonment8_10: number; // свыше 8 до 10 лет включительно
  primaryImprisonment10_15: number; // свыше 10 до 15 лет включительно
  primaryImprisonment15_20: number; // свыше 15 до 20 лет включительно

  primaryLifeSentence: number; // Пожизненное лишение свободы
  primaryArrest: number; // Арест
  primaryRestrain2009: number; // Ограничение свободы/ограничение по военной службе, содержание в дисциплинарной воинской части
  primaryCommunityService: number; // Обязательные работы
  primaryForcedLabour: number; // Принудительные работы
  primaryDisqualification: number; // Лишение права занимать определенные должности или заниматься определенной деятельностью
  primaryOther: number; // Условное осуждение к иным мерам
  primaryMilitaryDisciplinaryUnit: number; // Содержание в дисциплинарной воинской части
  primaryRestrictionsInMilitaryService: number; // Ограничение по военной службе

  dismissalAbsenceOfEvent: number; // Прекращено за отсутствием события, состава, непричастностью к преступлению
  dismissalReconciliation: number; // Прекращено за примирением с потерпевшим
  dismissalRepentance: number; // Прекращено в связи с деятельным раскаянием
  dismissalCourtFine: number; // Прекращено судебный штраф
  dismissalOther: number; // Прекращено по другим основаниям
  dismissalRepentance2: number; // Прекращено по другим основаниям: на основании примечаний к статьям УК РФ (в связи с деятельным раскаянием ч. 2 ст. 28 УПК РФ)'
}

class ClauseMainPage extends PureComponent<ClauseMainPageProps> {
  render(): React.ReactNode {
    const {
      clauseNumber,
      year,
      partsCount,
      total,
      totalConvicted,
      addTotalPersons,
      totalAcquittal,
      totalDismissal,
      totalCases,
      view,
      t,
    } = this.props;

    if (view === "iframe-table-common-main-by-result") {
      return <CommonMainResultsTable {...this.props} />;
    }

    if (view === "iframe-table-common-add-by-result") {
      return <CommonAddResultsTable {...this.props} />;
    }

    if (view === "iframe-by-result") {
      return <MainByResult {...this.props} isIframeMode />;
    }

    if (view === "iframe-table-focus") {
      return <ClauseMainPageFocusTable {...this.props} />;
    }

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title={t("Основной и дополнительный составы")}
        pageType="main"
        hasParts={partsCount > 0}
        headerChildren={this.renderHeaderChildren()}
        chartsLink={
          view === "focus" || view === "focus-table"
            ? getClauseLink(clauseNumber, year, "main", "focus")
            : undefined
        }
        tableLink={
          view === "focus" || view === "focus-table"
            ? getClauseLink(clauseNumber, year, "main", "focus-table")
            : undefined
        }
      >
        {view === "focus" ? <ClauseMainPageFocus {...this.props} /> : null}
        {view === "focus-table" ? (
          <ClauseMainPageFocusTable {...this.props} />
        ) : null}
        {view === "table" ? (
          <>
            <Helmet defer={false}>
              <title>
                {`${t("Статья")} ${clauseNumber} | ${t(
                  "Основной и дополнительный состав: общие сведения"
                )} | ${t("Таблица")}`}
              </title>
              <meta
                name="description"
                content={t(
                  "Общие сведения по основному и дополнительному составу статьи в виде таблицы"
                )}
              />
            </Helmet>
            <div className={classes.tableContainer}>
              <CommonMainResultsTable {...this.props} />
            </div>
            <div className={classes.tableContainer}>
              <CommonAddResultsTable {...this.props} />
            </div>
          </>
        ) : null}
        {view === "page" ? (
          <>
            <Helmet defer={false}>
              <title>
                {`${t("Статья")} ${clauseNumber} | ${t(
                  "Основной и дополнительный состав: общие сведения"
                )} | ${t("Чарты")}`}
              </title>
              <meta
                name="description"
                content={t(
                  "Общие сведения по основному и дополнительному составу статьи в виде чартов"
                )}
              />
            </Helmet>
            <Counters className={cn(classes.counter)}>
              <Counter
                counter={total}
                label={
                  <T message="количество человек, чьи дела прошли через суд" />
                }
              />
              <Counter
                counter={totalConvicted}
                label={<T message="человек осуждены по основному составу" />}
              />
              <Counter
                counter={addTotalPersons}
                label={
                  <T message="человек осуждены по дополнительному составу" />
                }
              />
              <Counter
                counter={totalAcquittal}
                label={<T message="человек оправданы по основному составу" />}
              />
              <Counter
                counter={totalDismissal}
                label={
                  <T message="человека, в отношении которых дело было прекращено по основному составу" />
                }
              />
            </Counters>
            <Counters className={cn(classes.counter)}>
              <Counter
                counter={totalCases}
                label={
                  <T message="общее количество случаев использования этой статьи" />
                }
              />
            </Counters>
            <div className={cn(classes.charts)}>
              <div className={cn(classes.chartContainer)}>
                <SpoilerText text={this.getText()} />
              </div>
            </div>
            <MainByResult {...this.props} />
          </>
        ) : null}
      </ClausePageLayout>
    );
  }

  private renderHeaderChildren = () => {
    const { clauseNumber, year } = this.props;
    return (
      <>
        <div className={classes.focusMenu}>
          <Menu variant="tabs" className={cn(classes.tabs)}>
            <MenuLink
              activeUrls={[getClauseLink(clauseNumber, year, "main", "table")]}
              to={getClauseLink(clauseNumber, year, "main")}
            >
              <T message="Основной и дополнительный состав: общие сведения" />
            </MenuLink>
            <MenuLink
              activeUrls={[
                getClauseLink(clauseNumber, year, "main", "focus-table"),
              ]}
              to={getClauseLink(clauseNumber, year, "main", "focus")}
            >
              <T message="Основной состав: в фокусе" />
            </MenuLink>
          </Menu>
        </div>
        <div className={cn(classes.textContainer)}>
          <Typography className={cn(classes.text)}>
            <T message="Если человека судят только за одно преступление, состав такого уголовного дела называется простым, если же судят за несколько сразу — квалифицированным. Наиболее тяжкое из вменяемых преступлений является основным составом, а остальные — дополнительными (иногда дополнительный состав также называют дополнительной квалификацией)." />
          </Typography>
        </div>
      </>
    );
  };

  private getText = () => {
    const {
      year,
      total,
      totalConvicted,
      primarySuspended,
      primaryRestrain,
      totalAcquittal,
      totalDismissal,
      nonRehabilitating,
      addTotalPersons,
      addAcquittalPersons,
      addDismissalPersons,
    } = this.props;
    return (
      <>
        <T
          message="В {{ year }} году по данной статье был осужден по основному составу <b>{{ count }}</b> человек"
          messagePlural="В {{ year }} году по данной статье были осуждены по основному составу <b>{{ count }}</b> человека"
          scope={{ year }}
          count={totalConvicted}
        />
        {". "}
        <T
          message="Из них <b>{{ count }}</b> ({{ primarySuspendedPercent }}%) был приговорен к лишению свободы условно"
          messagePlural="Из них <b>{{ count }}</b> ({{ primarySuspendedPercent }}%) были приговорены к лишению свободы условно"
          scope={{
            primarySuspendedPercent: formatNumber(
              primarySuspended / (totalConvicted / 100)
            ),
          }}
          count={primarySuspended}
        />
        {", "}
        <T
          message="еще <b>{{ count }}</b> ({{ primaryRestrainPercent }}%) получил реальные сроки"
          messagePlural="еще <b>{{ count }}</b> ({{ primaryRestrainPercent }}%) получили реальные сроки"
          count={primaryRestrain}
          scope={{
            primaryRestrainPercent: formatNumber(
              primaryRestrain / (totalConvicted / 100)
            ),
          }}
        />
        {". "}
        <T
          message="Оправдан <b>{{ count }}</b> человек"
          messagePlural="Оправданы <b>{{ count }}</b> человек"
          count={totalAcquittal}
        />
        {". "}
        <T
          message="Прекращены дела в отношении <b>{{ count }}</b> человека ({{ dismissalPercent }}% от всех, попавших в суд)"
          messagePlural="Прекращены дела в отношении <b>{{ count }}</b> человек ({{ dismissalPercent }}% от всех, попавших в суд)"
          count={totalDismissal}
          scope={{
            dismissalPercent: formatNumber(totalDismissal / (total / 100)),
          }}
        />
        {", "}
        <T
          message="из них {{ nonRehabilitating }} по нереабилитирующим основаниям"
          scope={{ nonRehabilitating: nonRehabilitating }}
        />
        {". "}
        <br />
        <br />
        <T
          message="<b>{{ count }}</b> человек были осуждены по дополнительному составу"
          messagePlural="<b>{{ count }}</b> человека были осуждены по дополнительному составу"
          count={addTotalPersons}
        />
        {". "}
        <T
          message="Еще в отношении <b>{{ count }}</b> человека суд принял решение прекратить дело по данной статье по дополнительному составу"
          messagePlural="Еще в отношении <b>{{ count }}</b> человек суд принял решение прекратить дело по данной статье по дополнительному составу"
          count={addDismissalPersons}
        />
        {". "}
        <T
          message="<b>{{ count }}</b> человек были оправданы по дополнительному составу"
          messagePlural="<b>{{ count }}</b> человек были оправданы по дополнительному составу"
          count={addAcquittalPersons}
        />
        {"."}
      </>
    );
  };
}

export default withLocale(ClauseMainPage);
