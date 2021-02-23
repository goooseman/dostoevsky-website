import React from "react";
import Table from "src/components/Table";
import { useLocale, T } from "react-targem";
import { getClauseLink } from "src/config/routes";

interface CommonAddResultsTableProps {
  clauseNumber: number;
  year: number;

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
}

const CommonAddResultsTable: React.FC<CommonAddResultsTableProps> = ({
  clauseNumber,
  year,
  ...p
}: CommonAddResultsTableProps) => {
  const { t, locale } = useLocale();

  const tables = [
    {
      columns: [
        { title: "", key: "1" },
        { title: t("по числу лиц"), key: "2" },
        { title: t("по количеству составов преступлений"), key: "3" },
      ],
      rows: [
        {
          key: "Всего осуждено",
          values: [
            {
              key: "title",
              value: "Всего осуждено",
            },
            {
              key: "main",
              value: p.addTotalPersons,
            },
            {
              key: "add",
              value: p.addTotalOffences,
            },
          ],
        },
        {
          key: "Оправдано",
          values: [
            {
              key: "title",
              value: "Оправдано",
            },
            {
              key: "main",
              value: p.addAcquittalPersons,
            },
            {
              key: "add",
              value: p.addAcquittalOffences,
            },
          ],
        },
        {
          key: "Прекращено",
          values: [
            {
              key: "title",
              value: "Прекращено",
            },
          ],
          isAccordion: true,
        },
        {
          key:
            "за отсутствием состава, события преступления, непричастностью к преступлению",
          values: [
            {
              key: "title",
              value:
                "за отсутствием состава, события преступления, непричастностью к преступлению",
            },
            {
              key: "main",
              value: p.addDismissalPersons,
            },
            {
              key: "add",
              value: p.addDismissalOffences,
            },
          ],
        },
        {
          key: "по иным основаниям",
          values: [
            {
              key: "title",
              value: "по иным основаниям",
            },
            {
              key: "main",
              value: p.addDismissalOtherPersons,
            },
            {
              key: "add",
              value: p.addDismissalOtherOffences,
            },
          ],
        },
        {
          key:
            "Принудительные меры медицинского характера в отношении невменяемого",
          values: [
            {
              key: "title",
              value:
                "Принудительные меры медицинского характера в отношении невменяемого",
            },
          ],
          isAccordion: true,
        },
        {
          key:
            "дополнительная квалификация по судебным постановлениям по количеству составов преступлений",
          values: [
            {
              key: "title",
              value:
                "дополнительная квалификация по судебным постановлениям по количеству составов преступлений",
            },
            {
              key: "main",
              value: p.addUnfitToPleadPersons,
            },
            {
              key: "add",
              value: p.addUnfitToPleadOffences,
            },
          ],
        },
      ],
    },
  ];

  return (
    <Table
      title={t("Дополнительный состав: детали")}
      downloadFilename={`${clauseNumber}-common-add-by-result`}
      iframePath={getClauseLink(
        locale,
        clauseNumber,
        year,
        "main",
        "iframe-table-common-add-by-result"
      )}
      tables={tables}
    />
  );
};

export default CommonAddResultsTable;
