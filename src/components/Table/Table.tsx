import React, { PureComponent } from "react";
import classes from "./Table.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import EmbedModal from "src/components/EmbedModal";
import DownloadButton from "src/components/DownloadButton";
import TableRow from "./components/TableRow";
import { Menu, MenuItem } from "src/components/Menu";

interface TableProps {
  title: React.ReactNode;
  tables: {
    columns: {
      title: string;
      key: string;
      isHidden?: boolean;
    }[];
    rows: {
      values: {
        value: string | number;
        key: string;
      }[];
      key: string;
      isAccordion?: boolean;
    }[];
    title?: React.ReactNode;
  }[];
  isEqualWidth?: boolean;
  isColored?: boolean;
  onDownloadButtonClick: () => void;
  onTableTitleClick: (i: number) => () => void;
  activeTableIndex: number;
  downloadFilename: string;
  iframePath: string;
}

class Table extends PureComponent<TableProps> {
  render(): React.ReactNode {
    const {
      title,
      tables,
      iframePath,
      onDownloadButtonClick,
      onTableTitleClick,
      activeTableIndex,
      isEqualWidth,
      isColored,
    } = this.props;

    const { rows, columns } = tables[activeTableIndex];

    return (
      <div className={cn(classes.container)}>
        <div className={cn(classes.titleContainer)}>
          <Typography variant="h3">
            <b>{title}</b>
          </Typography>
          <div className={cn(classes.buttonsContainer)}>
            <EmbedModal iframePath={iframePath} />
            <DownloadButton onClick={onDownloadButtonClick} />
          </div>
        </div>
        {tables.length > 1 ? (
          <Menu variant="default">
            {tables.map((t, i) => (
              <MenuItem
                key={i}
                isActive={i === activeTableIndex}
                onClick={onTableTitleClick(i)}
              >
                {t.title}
              </MenuItem>
            ))}
          </Menu>
        ) : null}

        <div className={cn(classes.tableContainer)}>
          <table
            className={cn(classes.table, {
              [classes.isEqualWidth]: isEqualWidth,
              [classes.isColored]: isColored,
            })}
          >
            <thead>
              <tr>
                {columns.map((c) =>
                  !c.isHidden ? (
                    <th key={c.key}>
                      <Typography isUpperCased component="span">
                        <b>
                          <small>{c.title}</small>
                        </b>
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
