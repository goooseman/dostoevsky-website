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
        clauseNumber.toString(),
        year.toString(),
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
              { key: "main", value: p.byResult.convictedCount.toString() },
            ],
          },
        ],
      }))}
    />
  );
};

export default ClausePartsTable;
