import React, { PureComponent } from "react";
import classes from "./Table.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import EmbedModal from "src/components/EmbedModal";
import DownloadButton from "src/components/DownloadButton";
import TableRow from "./components/TableRow";
import { Menu, MenuItem } from "src/components/Menu";

interface TableProps {
  title: string;
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
        helpText?: string;
      }[];
      key: string;
      isAccordion?: boolean;
    }[];
    title?: React.ReactNode;
  }[];
  isEqualWidth?: boolean;
  isNotPaddedLeft?: boolean;
  isNotMarginTop?: boolean;
  isColored?: boolean;
  hideEmbed?: boolean;
  onDownloadButtonClick?: () => void;
  onTableTitleClick?: (i: number) => () => void;
  activeTableIndex: number;
  downloadFilename?: string;
  iframePath?: string;
  isScrollable?: boolean;
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
      isNotPaddedLeft,
      isNotMarginTop,
      isEqualWidth,
      isColored,
      hideEmbed,
      isScrollable,
    } = this.props;

    const { rows, columns } = tables[activeTableIndex];

    return (
      <div
        className={cn(classes.container, {
          [classes.isNotPaddedLeft]: isNotPaddedLeft,
        })}
      >
        <div
          className={cn(classes.titleContainer, {
            [classes.isNotMarginTop]: isNotMarginTop,
          })}
        >
          <Typography variant="h3">
            <b>{title}</b>
          </Typography>
          {!hideEmbed && iframePath ? (
            <div className={cn(classes.buttonsContainer)}>
              <EmbedModal title={title} type="table" iframePath={iframePath} />
              <DownloadButton
                type="table"
                title={title}
                onClick={
                  onDownloadButtonClick ? onDownloadButtonClick : () => false
                }
              />
            </div>
          ) : null}
        </div>
        {tables.length > 1 ? (
          <Menu variant="default">
            {tables.map((t, i) => (
              <MenuItem
                key={i}
                isActive={i === activeTableIndex}
                onClick={onTableTitleClick && onTableTitleClick(i)}
              >
                {t.title}
              </MenuItem>
            ))}
          </Menu>
        ) : null}

        <div
          className={cn(classes.tableContainer, {
            [classes.isScrollable]: isScrollable,
          })}
        >
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
