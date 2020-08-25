import React, { PureComponent } from "react";
import classes from "./ClausePartsTable.module.css";
import cn from "clsx";
import Table from "src/components/Table";
import { useLocale, T } from "react-targem";
import type { ClausePartsPageProps } from "../../ClausePartsPage";
import { getClauseLink } from "src/config/routes";

interface ClausePartsTableProps extends ClausePartsPageProps {}

const ClausePartsTable: React.FC<ClausePartsTableProps> = ({
  clauseNumber,
  year,
  parts,
}: ClausePartsTableProps) => {
  const { t } = useLocale();
  return (
    <Table
      title={
        <T
          message="Результаты рассмотрения дел по статье {{ clause }}"
          scope={{ clause: clauseNumber }}
        />
      }
      downloadFilename={`${clauseNumber}-${year}-parts`}
      iframePath={getClauseLink(
        clauseNumber,
        year,
        "parts",
        "iframe-table-parts"
      )}
      tables={parts.map((p) => ({
        title: p.part,
        columns: [
          { title: "", key: "title", isHidden: true },
          { title: "", key: "main", isHidden: true },
        ],
        rows: [
          {
            key: "1",
            values: [{ key: "title", value: t("основной состав") }],
            isAccordion: true,
          },
          {
            key: "2",
            values: [
              { key: "title", value: t("Всего осуждено") },
              { key: "main", value: p.byResult.convictedCount },
            ],
          },
          {
            key: "3",
            values: [
              { key: "title", value: t("Оправдано") },
              { key: "main", value: p.byResult.acquittalCount },
            ],
          },
          {
            key: "4",
            values: [
              { key: "title", value: t("Принудительные меры к невменяемым") },
              {
                key: "main",
                value: p.byResult.compulsoryTreatmentCount,
              },
            ],
          },
          {
            key: "5",
            values: [
              {
                key: "title",
                value: t(
                  "Преступление не является оконченным (приготовление, покушение)"
                ),
              },
              {
                key: "main",
                value: p.byResult.unfinishedOffenceCount,
              },
            ],
          },
          {
            key: "6",
            values: [
              {
                key: "title",
                value: t(
                  "Число лиц, в отношении которых уголовные дела прекращены за отсутствием состава, события преступления, непричастностью к преступлению по основной статье"
                ),
              },
              { key: "main", value: "xx" },
            ],
          },
          {
            key: "7",
            values: [
              {
                key: "title",
                value: t(
                  "Число лиц, в отношении которых уголовные дела прекращены по иным основаниям по основной статье"
                ),
              },
              { key: "main", value: "xx" },
            ],
          },
          {
            key: "8",
            values: [
              {
                key: "title",
                value: t(
                  "Освобождено от наказания или наказание не назначалось"
                ),
              },
              { key: "main", value: "xx" },
            ],
          },
          {
            key: "9",
            values: [{ key: "title", value: t("Дополнительный состав") }],
            isAccordion: true,
          },
          {
            key: "10",
            values: [
              { key: "title", value: t("Всего осуждено (по числу лиц)") },
              {
                key: "main",
                value: p.byResult.addTotalPersonsCount,
              },
            ],
          },
          {
            key: "11",
            values: [
              {
                key: "title",
                value: t(
                  "Всего осуждено (по количеству составов преступлений) "
                ),
              },
              {
                key: "main",
                value: p.byResult.addTotalOffencesCount,
              },
            ],
          },
          {
            key: "12",
            values: [
              { key: "title", value: t("Оправдано (по числу лиц)") },
              {
                key: "main",
                value: p.byResult.addAcquittalPersonsCount,
              },
            ],
          },
          {
            key: "13",
            values: [
              {
                key: "title",
                value: t("Оправдано (по количеству составов преступлений)"),
              },
              {
                key: "main",
                value: p.byResult.addAcquittalOffencesCount,
              },
            ],
          },
          {
            key: "14",
            values: [{ key: "title", value: t("Виды основного наказания") }],
            isAccordion: true,
          },
          {
            key: "15",
            values: [
              { key: "title", value: t("Лишение свободы") },
              {
                key: "main",
                value: p.byPunishment.primaryImprisonmentCount,
              },
            ],
          },
          {
            key: "16",
            values: [
              {
                key: "title",
                value: t("Условное осуждение к лишению свободы"),
              },
              {
                key: "main",
                value: p.byPunishment.primarySuspendedCount,
              },
            ],
          },
          {
            key: "17",
            values: [
              {
                key: "title",
                value: t("Содержание в дисциплинарной воинской части"),
              },
              {
                key: "main",
                value: p.byPunishment.primaryMilitaryDisciplinaryUnitCount,
              },
            ],
          },
          {
            key: "18",
            values: [
              { key: "title", value: t("Арест") },
              {
                key: "main",
                value: p.byPunishment.primaryArrestCount,
              },
            ],
          },
          {
            key: "19",
            values: [
              { key: "title", value: t("Ограничение свободы") },
              {
                key: "main",
                value: p.byPunishment.primaryRestrainCount,
              },
            ],
          },
          {
            key: "20",
            values: [
              { key: "title", value: t("Ограничение по военной службе") },
              {
                key: "main",
                value: p.byPunishment.primaryRestrictionsInMilitaryServiceCount,
              },
            ],
          },
          {
            key: "21",
            values: [{ key: "title", value: t("Работы") }],
            isAccordion: true,
          },
          {
            key: "22",
            values: [
              { key: "title", value: t("Исправительные работы") },
              {
                key: "main",
                value: p.byPunishment.primaryCorrectionalLabourCount,
              },
            ],
          },
          {
            key: "23",
            values: [
              { key: "title", value: t("Обязательные работы") },
              {
                key: "main",
                value: p.byPunishment.primaryCommunityServiceCount,
              },
            ],
          },
          {
            key: "24",
            values: [
              { key: "title", value: t("Принудительные работы") },
              {
                key: "main",
                value: p.byPunishment.primaryForcedLabourCount,
              },
            ],
          },
          {
            key: "25",
            values: [
              {
                key: "title",
                value: t(
                  "Лишение права занимать определенные должности или заниматься определенной деятельностью"
                ),
              },
              {
                key: "main",
                value: p.byPunishment.primaryDisqualificationCount,
              },
            ],
          },
          {
            key: "26",
            values: [
              { key: "title", value: t("Штраф") },
              {
                key: "main",
                value: p.byPunishment.primaryFineCount,
              },
            ],
          },
          {
            key: "27",
            values: [
              { key: "title", value: t("Условное осуждение к иным мерам") },
              {
                key: "main",
                value: p.byPunishment.primaryOtherCount,
              },
            ],
          },
          {
            key: "25",
            values: [
              { key: "title", value: t("Прекращено (основной состав)") },
            ],
            isAccordion: true,
          },
          {
            key: "26",
            values: [
              {
                key: "title",
                value: t(
                  "За отсутствием события, состава, непричастностью к преступлению"
                ),
              },
              {
                key: "main",
                value: p.byDismissal.dismissalAbsenceOfEventCount,
              },
            ],
          },
          {
            key: "27",
            values: [
              { key: "title", value: t("По амнистии") },
              {
                key: "main",
                value: p.byDismissal.dismissalAmnestyCount,
              },
            ],
          },
          {
            key: "28",
            values: [
              {
                key: "title",
                value: t("За примирением с потерпевшим (ст. 25 УПК РФ)"),
              },
              {
                key: "main",
                value: p.byDismissal.dismissalReconciliationCount,
              },
            ],
          },
          {
            key: "29",
            values: [
              {
                key: "title",
                value: t("В связи с деятельным раскаянием (ст. 28 УПК РФ)"),
              },
              {
                key: "main",
                value: p.byDismissal.dismissalRepentanceCount,
              },
            ],
          },
          {
            key: "30",
            values: [
              {
                key: "title",
                value: t(
                  "Назначена мера уголовно-правового характера судебный штраф (ст. 25.1 УПК РФ)"
                ),
              },
              {
                key: "main",
                value: p.byDismissal.dismissalCourtFinеCount,
              },
            ],
          },
          {
            key: "31",
            values: [
              { key: "title", value: t("По другим основаниям") },
              {
                key: "main",
                value: p.byDismissal.dismissalOtherCount,
              },
            ],
          },
          {
            key: "32",
            values: [
              {
                key: "title",
                value: t(
                  "На основании примечаний к статьям УК РФ (в том числе в связи с деятельным раскаянием ч. 2 ст. 28 УПК РФ)"
                ),
              },
              {
                key: "main",
                value: p.byDismissal.dismissalRepentance2Count,
              },
            ],
          },
          {
            key: "33",
            values: [
              { key: "title", value: t("Прекращено (дополнительный состав)") },
            ],
            isAccordion: true,
          },
          {
            key: "34",
            values: [
              {
                key: "title",
                value: t(
                  "За отсутствием состава, события преступления, непричастностью к преступлению (по числу лиц)"
                ),
              },
              {
                key: "main",
                value: p.byDismissal.addDismissalPersonsCount,
              },
            ],
          },
          {
            key: "35",
            values: [
              {
                key: "title",
                value: t(
                  "За отсутствием состава, события преступления, непричастностью к преступлению (по количеству составов преступлений)"
                ),
              },
              {
                key: "main",
                value: p.byDismissal.addDismissalOffencesCount,
              },
            ],
          },
          {
            key: "36",
            values: [
              { key: "title", value: t("По иным основаниям (по числу лиц) ") },
              {
                key: "main",
                value: p.byDismissal.addDismissalOtherPersonsCount,
              },
            ],
          },
          {
            key: "37",
            values: [
              {
                key: "title",
                value: t(
                  "По иным основаниям (по количеству составов преступлений)"
                ),
              },
              {
                key: "main",
                value: p.byDismissal.addDismissalOtherOffencesCount,
              },
            ],
          },
          {
            key: "37",
            values: [{ key: "title", value: t("Дополнительное наказание") }],
            isAccordion: true,
          },
          {
            key: "38",
            values: [
              {
                key: "title",
                value: t(
                  "Лишение права занимать определенные должности или заниматься определенной деятельностью"
                ),
              },
              {
                key: "main",
                value: p.byPunishment.addDisqualificationCount,
              },
            ],
          },
          {
            key: "39",
            values: [
              { key: "title", value: t("Штраф") },
              { key: "main", value: p.byPunishment.addFineCount },
            ],
          },
          {
            key: "40",
            values: [
              {
                key: "title",
                value: t(
                  "Лишение специального, воинского или почетного звания, классного чина и государственных наград"
                ),
              },
              { key: "main", value: p.byPunishment.addTitlesWithdrawCount },
            ],
          },
          {
            key: "41",
            values: [
              { key: "title", value: t("Ограничение свободы") },
              { key: "main", value: p.byPunishment.addRestrainCount },
            ],
          },
          {
            key: "42",
            values: [
              {
                key: "title",
                value: t(
                  "Деяние совершено при обстоятельствах, исключающих преступность"
                ),
              },
            ],
            isAccordion: true,
          },
          {
            key: "43",
            values: [
              { key: "title", value: t("необходимая оборона (ст. 37 УК РФ)") },
              { key: "main", value: p.byResult.noCrimeSelfDefenceCount },
            ],
          },
          {
            key: "44",
            values: [
              {
                key: "title",
                value: t("крайняя необходимость (ст. 39 УК РФ)"),
              },
              { key: "main", value: p.byResult.noCrimeNecessityCount },
            ],
          },
          {
            key: "45",
            values: [
              {
                key: "title",
                value: t(
                  "обстоятельства, предусмотренные статьями 38, 40 - 42 УК РФ"
                ),
              },
              { key: "main", value: p.byResult.noCrimeOtherCount },
            ],
          },
        ],
      }))}
    />
  );
};

export default ClausePartsTable;
