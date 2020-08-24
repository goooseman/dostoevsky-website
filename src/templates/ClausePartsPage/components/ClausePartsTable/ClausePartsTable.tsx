import React, { PureComponent } from "react";
import classes from "./ClausePartsTable.module.css";
import cn from "clsx";
import Table from "src/components/Table";
import { T } from "react-targem";
import type { ClausePartsPageProps } from "../../ClausePartsPage";
import { getClauseLink } from "src/config/routes";

interface ClausePartsTableProps extends ClausePartsPageProps {}

class ClausePartsTable extends PureComponent<ClausePartsTableProps> {
  render(): React.ReactNode {
    const { clauseNumber, year, parts } = this.props;
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
              values: [
                { key: "title", value: <T message="основной состав" /> },
              ],
              isAccordion: true,
            },
            {
              key: "2",
              values: [
                { key: "title", value: "Всего осуждено" },
                { key: "main", value: p.byResult.convictedCount },
              ],
            },
          ],
        }))}
      />
    );
  }
}

export default ClausePartsTable;
