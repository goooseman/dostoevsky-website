import React from "react";
import Table from "src/components/Table";
import { useLocale, T } from "react-targem";
import { getClauseLink } from "src/config/routes";
import { Helmet } from "react-helmet";

interface ClauseMainPageFocusTableProps {
  clauseNumber: number;
  year: number;
  totalConvicted: number; // Всего осуждено
  totalAcquittal: number; // Оправдано
  coerciveMeasures: number; // Принудительные меры к невменяемым
  unfinishedOffence: number; // Преступление не является оконченным (приготовление, покушение)
  addTotalPersons: number; // Доп. квалификация: осуждено по числу лиц
  addTotalOffences: number; // Доп. квалификация: осуждено по количеству составов преступлений
  addAcquittalPersons: number; // Доп. квалификация: оправдано по числу лиц
  addAcquittalOffences: number; // Доп. квалификация: оправдано по количеству составов преступлений
  noCrimeSelfDefence: number; // Обстоятельства, исключающие преступность: необходимая оборона
  noCrimeNecessity: number; // Обстоятельства, исключающие преступность: крайняя необходимость
  noCrimeOther: number; // Обстоятельства, исключающие преступность, предусмотренные статьями 38, 40 - 42 УК РФ

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
}

const ClauseMainPageFocusTable: React.FC<ClauseMainPageFocusTableProps> = ({
  clauseNumber,
  year,
  ...p
}: ClauseMainPageFocusTableProps) => {
  const { t, locale } = useLocale();
  return (
    <>
      <Helmet defer={false}>
        <title>
          {`${t("Статья")} ${clauseNumber} | ${t(
            "Основной состав: в фокусе"
          )} | ${t("Таблица")}`}
        </title>
        <meta
          name="description"
          content={t(
            "Информация по основному и дополнительному составу статьи в виде таблицы"
          )}
        />
      </Helmet>
      <Table
        title={
          <T
            message="Результаты рассмотрения дел по статье {{ clause }}"
            scope={{ clause: clauseNumber }}
          />
        }
        downloadFilename={`${clauseNumber}-${year}-parts`}
        iframePath={getClauseLink(
          locale,
          clauseNumber,
          year,
          "main",
          "iframe-table-focus"
        )}
        tables={[
          {
            columns: [
              { title: "", key: "title", isHidden: true },
              { title: "", key: "main", isHidden: true },
            ],
            rows: [
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
                  {
                    key: "title",
                    value: t("Принудительные меры к невменяемым"),
                  },
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
                key: "9",
                values: [
                  { key: "title", value: t("Виды основного наказания") },
                ],
                isAccordion: true,
              },
              {
                key: "10",
                values: [
                  { key: "title", value: t("Лишение свободы") },
                  {
                    key: "main",
                    value: p.primaryImprisonment,
                  },
                ],
              },
              {
                key: "11",
                values: [
                  {
                    key: "title",
                    value: t("Пожизненное лишение свободы"),
                  },
                  {
                    key: "main",
                    value: p.primaryLifeSentence,
                  },
                ],
              },
              {
                key: "12",
                values: [
                  {
                    key: "title",
                    value: t(
                      "Наказание назначено ниже низшего предела лишение свободы"
                    ),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonmentUnderLowerLimit,
                  },
                ],
              },
              {
                key: "13",
                values: [
                  {
                    key: "title",
                    value: t("до 1 года включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment1,
                  },
                ],
              },
              {
                key: "14",
                values: [
                  {
                    key: "title",
                    value: t("от 1 до 3 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment1_3,
                  },
                ],
              },
              {
                key: "15",
                values: [
                  {
                    key: "title",
                    value: t("свыше 1 до 2 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment1_2,
                  },
                ],
              },
              {
                key: "16",
                values: [
                  {
                    key: "title",
                    value: t("свыше 2 до 3 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment2_3,
                  },
                ],
              },
              {
                key: "17",
                values: [
                  {
                    key: "title",
                    value: t("свыше 3 до 5 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment3_5,
                  },
                ],
              },
              {
                key: "18",
                values: [
                  {
                    key: "title",
                    value: t("свыше 5 до 8 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment5_8,
                  },
                ],
              },
              {
                key: "19",
                values: [
                  {
                    key: "title",
                    value: t("свыше 8 до 10 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment8_10,
                  },
                ],
              },
              {
                key: "20",
                values: [
                  {
                    key: "title",
                    value: t("свыше 10 до 15 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment10_15,
                  },
                ],
              },
              {
                key: "21",
                values: [
                  {
                    key: "title",
                    value: t("свыше 15 до 20 лет включительно"),
                  },
                  {
                    key: "main",
                    value: p.primaryImprisonment15_20,
                  },
                ],
              },
              {
                key: "22",
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
                key: "23",
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
                key: "24",
                values: [
                  {
                    key: "title",
                    value: t("Арест"),
                  },
                  {
                    key: "main",
                    value: p.primaryArrest,
                  },
                ],
              },
              {
                key: "25",
                values: [
                  {
                    key: "title",
                    value: t("Ограничение свободы"),
                  },
                  {
                    key: "main",
                    value: p.primaryRestrain,
                  },
                ],
              },
              {
                key: "26",
                values: [
                  {
                    key: "title",
                    value: t("Ограничения по воинской службе"),
                  },
                  {
                    key: "main",
                    value: p.primaryRestrictionsInMilitaryService,
                  },
                ],
              },
              {
                key: "27",
                values: [{ key: "title", value: t("Работы") }],
                isAccordion: true,
              },
              {
                key: "28",
                values: [
                  {
                    key: "title",
                    value: t("Исправительные работы"),
                  },
                  {
                    key: "main",
                    value: p.primaryCorrectionalLabour,
                  },
                ],
              },
              {
                key: "29",
                values: [
                  {
                    key: "title",
                    value: t("Обязательные работы"),
                  },
                  {
                    key: "main",
                    value: p.primaryCommunityService,
                  },
                ],
              },
              {
                key: "30",
                values: [
                  {
                    key: "title",
                    value: t("Принудительные работы"),
                  },
                  {
                    key: "main",
                    value: p.primaryForcedLabour,
                  },
                ],
              },
              {
                key: "31",
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
                key: "32",
                values: [
                  {
                    key: "title",
                    value: t("штраф"),
                  },
                  {
                    key: "main",
                    value: p.addFine,
                  },
                ],
              },
              {
                key: "33",
                values: [
                  {
                    key: "title",
                    value: t("Условное осуждение к иным мерам"),
                  },
                  {
                    key: "main",
                    value: p.primaryOther,
                  },
                ],
              },
              {
                key: "34",
                values: [{ key: "title", value: t("Прекращено") }],
                isAccordion: true,
              },
              {
                key: "35",
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
                key: "36",
                values: [
                  {
                    key: "title",
                    value: t("По амнистии"),
                  },
                  {
                    key: "main",
                    value: p.dismissalAmnesty,
                  },
                ],
              },
              {
                key: "37",
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
                key: "38",
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
                key: "39",
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
                key: "40",
                values: [
                  {
                    key: "title",
                    value: t("По другим основаниям"),
                  },
                  {
                    key: "main",
                    value: p.dismissalOther,
                  },
                ],
              },
              {
                key: "41",
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
                key: "42",
                values: [
                  { key: "title", value: t("Дополнительное наказание") },
                ],
                isAccordion: true,
              },
              {
                key: "43",
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
                key: "44",
                values: [
                  { key: "title", value: t("Штраф") },
                  { key: "main", value: p.addFine },
                ],
              },
              {
                key: "45",
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
                key: "46",
                values: [
                  { key: "title", value: t("Ограничение свободы") },
                  { key: "main", value: p.addRestrain },
                ],
              },
              {
                key: "47",
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
                key: "48",
                values: [
                  {
                    key: "title",
                    value: t("необходимая оборона (ст. 37 УК РФ)"),
                  },
                  { key: "main", value: p.noCrimeSelfDefence },
                ],
              },
              {
                key: "49",
                values: [
                  {
                    key: "title",
                    value: t("крайняя необходимость (ст. 39 УК РФ)"),
                  },
                  { key: "main", value: p.noCrimeNecessity },
                ],
              },
              {
                key: "50",
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
          },
        ]}
      />
    </>
  );
};

export default ClauseMainPageFocusTable;
