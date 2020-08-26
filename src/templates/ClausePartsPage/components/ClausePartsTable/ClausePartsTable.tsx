import React from "react";
import Table from "src/components/Table";
import { useLocale, T } from "react-targem";
import { getClauseLink } from "src/config/routes";

interface ClausePartsTableProps {
  clauseNumber: number;
  year: number;
  parts: {
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
  }[];
}

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
              { key: "main", value: p.totalConvicted },
            ],
          },
          {
            key: "3",
            values: [
              { key: "title", value: t("Оправдано") },
              { key: "main", value: p.totalAcquittal },
            ],
          },
          {
            key: "4",
            values: [
              { key: "title", value: t("Принудительные меры к невменяемым") },
              {
                key: "main",
                value: p.coerciveMeasures,
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
                value: p.unfinishedOffence,
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
                value: p.addTotalPersons,
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
                value: p.addTotalOffences,
              },
            ],
          },
          {
            key: "12",
            values: [
              { key: "title", value: t("Оправдано (по числу лиц)") },
              {
                key: "main",
                value: p.addAcquittalPersons,
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
                value: p.addAcquittalOffences,
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
                value: p.primaryImprisonment,
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
                value: p.primarySuspended,
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
                value: p.primaryMilitaryDisciplinaryUnit,
              },
            ],
          },
          {
            key: "18",
            values: [
              { key: "title", value: t("Арест") },
              {
                key: "main",
                value: p.primaryArrest,
              },
            ],
          },
          {
            key: "19",
            values: [
              { key: "title", value: t("Ограничение свободы") },
              {
                key: "main",
                value: p.primaryRestrain,
              },
            ],
          },
          {
            key: "20",
            values: [
              { key: "title", value: t("Ограничение по военной службе") },
              {
                key: "main",
                value: p.primaryRestrictionsInMilitaryService,
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
                value: p.primaryCorrectionalLabour,
              },
            ],
          },
          {
            key: "23",
            values: [
              { key: "title", value: t("Обязательные работы") },
              {
                key: "main",
                value: p.primaryCommunityService,
              },
            ],
          },
          {
            key: "24",
            values: [
              { key: "title", value: t("Принудительные работы") },
              {
                key: "main",
                value: p.primaryForcedLabour,
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
                value: p.primaryDisqualification,
              },
            ],
          },
          {
            key: "26",
            values: [
              { key: "title", value: t("Штраф") },
              {
                key: "main",
                value: p.primaryFine,
              },
            ],
          },
          {
            key: "27",
            values: [
              { key: "title", value: t("Условное осуждение к иным мерам") },
              {
                key: "main",
                value: p.primaryOther,
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
                value: p.dismissalAbsenceOfEvent,
              },
            ],
          },
          {
            key: "27",
            values: [
              { key: "title", value: t("По амнистии") },
              {
                key: "main",
                value: p.dismissalAmnesty,
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
                value: p.dismissalReconciliation,
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
                value: p.dismissalRepentance,
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
                value: p.dismissalCourtFine,
              },
            ],
          },
          {
            key: "31",
            values: [
              { key: "title", value: t("По другим основаниям") },
              {
                key: "main",
                value: p.dismissalOther,
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
                value: p.dismissalRepentance2,
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
                value: p.addDismissalPersons,
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
                value: p.addDismissalOffences,
              },
            ],
          },
          {
            key: "36",
            values: [
              { key: "title", value: t("По иным основаниям (по числу лиц) ") },
              {
                key: "main",
                value: p.addDismissalOtherPersons,
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
                value: p.addDismissalOtherOffences,
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
                value: p.addDisqualification,
              },
            ],
          },
          {
            key: "39",
            values: [
              { key: "title", value: t("Штраф") },
              { key: "main", value: p.addFine },
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
              { key: "main", value: p.addTitlesWithdraw },
            ],
          },
          {
            key: "41",
            values: [
              { key: "title", value: t("Ограничение свободы") },
              { key: "main", value: p.addRestrain },
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
              { key: "main", value: p.noCrimeSelfDefence },
            ],
          },
          {
            key: "44",
            values: [
              {
                key: "title",
                value: t("крайняя необходимость (ст. 39 УК РФ)"),
              },
              { key: "main", value: p.noCrimeNecessity },
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
              { key: "main", value: p.noCrimeOther },
            ],
          },
        ],
      }))}
    />
  );
};

export default ClausePartsTable;
