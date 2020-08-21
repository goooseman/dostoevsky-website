import React, { PureComponent } from "react";
import classes from "./Table.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import EmbedModal from "src/components/EmbedModal";
import DownloadButton from "src/components/DownloadButton";

interface TableProps {
  title: React.ReactNode;
  columns: {
    title: React.ReactNode;
    key: string;
  }[];
  rows: {
    values: {
      value: React.ReactNode;
      key: string;
    }[];
    key: string;
  }[];
  onDownloadButtonClick: () => void;
  downloadFilename: string;
}

class Table extends PureComponent<TableProps> {
  render(): React.ReactNode {
    const { title, columns, rows, onDownloadButtonClick } = this.props;
    return (
      <div>
        <div className={cn(classes.titleContainer)}>
          <Typography variant="h3">{title}</Typography>
          <div className={cn(classes.buttonsContainer)}>
            <EmbedModal iframePath="TODO" />
            <DownloadButton onClick={onDownloadButtonClick} />
          </div>
        </div>
        <table className={cn(classes.table)}>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>
                <Typography isUpperCased component="span">
                  <b>{c.title}</b>
                </Typography>
              </th>
            ))}
          </tr>
          {rows.map((r) => (
            <tr key={r.key}>
              {r.values.map((v) => (
                <td key={v.key}>
                  <Typography component="span">{v.value}</Typography>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default Table;
