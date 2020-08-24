import React, { PureComponent } from "react";
import classes from "./Table.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import EmbedModal from "src/components/EmbedModal";
import DownloadButton from "src/components/DownloadButton";
import TableRow from "./components/TableRow";

interface TableProps {
  title: React.ReactNode;
  columns: {
    title: React.ReactNode;
    key: string;
    isHidden?: boolean;
  }[];
  rows: {
    values: {
      value: React.ReactNode;
      key: string;
    }[];
    key: string;
    isAccordion?: boolean;
  }[];
  onDownloadButtonClick: () => void;
  downloadFilename: string;
  iframePath: string;
}

class Table extends PureComponent<TableProps> {
  render(): React.ReactNode {
    const {
      title,
      columns,
      iframePath,
      rows,
      onDownloadButtonClick,
    } = this.props;
    return (
      <div>
        <div className={cn(classes.titleContainer)}>
          <Typography variant="h3">{title}</Typography>
          <div className={cn(classes.buttonsContainer)}>
            <EmbedModal iframePath={iframePath} />
            <DownloadButton onClick={onDownloadButtonClick} />
          </div>
        </div>
        <div className={cn(classes.tableContainer)}>
          <table className={cn(classes.table)}>
            <thead>
              <tr>
                {columns.map((c) =>
                  !c.isHidden ? (
                    <th key={c.key}>
                      <Typography isUpperCased component="span">
                        <b>{c.title}</b>
                      </Typography>
                    </th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <TableRow
                  isAccordion={Boolean(r.isAccordion)}
                  columnsCount={columns.length}
                  values={r.values}
                  key={r.key}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
