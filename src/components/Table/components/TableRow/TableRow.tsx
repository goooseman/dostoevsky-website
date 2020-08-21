import React, { PureComponent } from "react";
import classes from "./TableRow.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";

interface TableRowProps {
  values: {
    value: React.ReactNode;
    key: string;
  }[];
  isAccordion: boolean;
  columnsCount: number;
  isOpened: boolean;
  onClick: () => void;
}

class TableRow extends PureComponent<TableRowProps> {
  render(): React.ReactNode {
    const { values, columnsCount, isAccordion, onClick, isOpened } = this.props;

    return (
      <tr
        onClick={isAccordion ? onClick : undefined}
        className={cn({
          [classes.rowAccordion]: isAccordion,
          [classes.isOpened]: isOpened,
        })}
      >
        {values.map((v) => (
          <td key={v.key} colSpan={isAccordion ? columnsCount : undefined}>
            <Typography isUpperCased={Boolean(isAccordion)} component="span">
              {isAccordion ? <b>{v.value}</b> : v.value}
            </Typography>
          </td>
        ))}
      </tr>
    );
  }
}

export default TableRow;
