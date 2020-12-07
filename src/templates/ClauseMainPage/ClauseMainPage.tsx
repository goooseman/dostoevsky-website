import React, { PureComponent } from "react";
import ClausePageLayout from "src/components/ClausePageLayout";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
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

export type ClausePartsPageViewMode =
  | "page"
  | "table"
  | "focus"
  | "iframe-table-common-main-by-result"
  | "iframe-table-common-add-by-result"
  | "iframe-by-result";

interface ClauseMainPageProps {
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

    return (
      <ClausePageLayout
        clauseNumber={clauseNumber}
        year={year}
        title="Основной и дополнительный составы"
        pageType="main"
        hasParts={partsCount > 0}
        headerChildren={this.renderHeaderChildren()}
      >
        {view === "focus" ? <ClauseMainPageFocus {...this.props} /> : null}
        {view === "table" ? (
          <>
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
            <Counters className={cn(classes.counter)}>
              <Counter
                counter={total}
                label={
                  <T message="количество человек, чьи дела прошли через суд" />
                }
              />
              <Counter
                counter={totalConvicted}
                label={<T message="человек Осуждены по основному составу" />}
              />
              <Counter
                counter={addTotalPersons}
                label={
                  <T message="человек Осуждены по дополнительному составу" />
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
            <MenuLink to={getClauseLink(clauseNumber, year, "main")}>
              <T message="Основной и дополнительный состав: общие сведения" />
            </MenuLink>
            <MenuLink to={getClauseLink(clauseNumber, year, "main", "focus")}>
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
          message="В {{ year }} году по данной статье был осужден по основному составу"
          messagePlural="В {{ year }} году по данной статье были осуждены по основному составу"
          scope={{ year }}
          count={totalConvicted}
        />{" "}
        <b>{totalConvicted}</b>{" "}
        <T message="человек" messagePlural="человек" count={totalConvicted} />
        {". "}
        <T message="Из них" /> <b>{primarySuspended}</b>{" "}
        <T
          message="({{ primarySuspendedPercent }}%) был приговорен к лишению свободы условно"
          messagePlural="({{ primarySuspendedPercent }}%) были приговорены к лишению свободы условно"
          scope={{
            primarySuspendedPercent: formatNumber(
              primarySuspended / (totalConvicted / 100)
            ),
          }}
          count={primarySuspended}
        />
        {", "}
        <T message="еще" /> <b>{primaryRestrain}</b>{" "}
        <T
          message="({{ primaryRestrainPercent }}%) получил реальные сроки"
          messagePlural="({{ primaryRestrainPercent }}%) получили реальные сроки"
          count={0}
          scope={{
            primaryRestrainPercent: formatNumber(
              primaryRestrain / (totalConvicted / 100)
            ),
          }}
        />
        {". "}
        <T
          message="Оправдан"
          messagePlural="Оправданы"
          count={totalAcquittal}
        />{" "}
        <b>{totalAcquittal}</b>{" "}
        <T message="человек" messagePlural="человек" count={totalAcquittal} />
        {". "}
        <T message="Прекращены дела в отношении" /> <b>{totalDismissal}</b>{" "}
        <T message="человек" messagePlural="человек" count={totalDismissal} />{" "}
        <T
          message="({{ dismissalPercent }}% от всех, попавших в суд)"
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
        <b>{addTotalPersons}</b>{" "}
        <T
          message="человек были осуждены по дополнительному составу"
          messagePlural="человека были осуждены по дополнительному составу"
          count={addTotalPersons}
        />
        {". "}
        <T message="Еще в отношении" /> <b>{addDismissalPersons}</b>{" "}
        <T
          message="человек суд принял решение прекратить дело по данной статье по дополнительному составу"
          messagePlural="человек суд принял решение прекратить дело по данной статье по дополнительному составу"
          count={addDismissalPersons}
        />
        {". "}
        <b>{addAcquittalPersons}</b>{" "}
        <T
          message="человек были оправданы по дополнительному составу"
          messagePlural="человек были оправданы по дополнительному составу"
          count={addAcquittalPersons}
        />
        {"."}
      </>
    );
  };
}

export default ClauseMainPage;
