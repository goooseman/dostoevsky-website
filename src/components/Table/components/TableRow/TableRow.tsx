import React, { PureComponent } from "react";
import classes from "./TableRow.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { WithLocale, withLocale } from "react-targem";

interface TableRowProps extends WithLocale {
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
          [classes.isRegular]: !isAccordion,
          [classes.isClosed]: !isOpened,
        })}
      >
        {values.map((v) => (
          <td key={v.key} colSpan={isAccordion ? columnsCount : undefined}>
            {this.getAccrodionButton()}
            <Typography
              isUpperCased={isAccordion}
              isCapitalized={!isAccordion}
              component="span"
            >
              {isAccordion ? <b>{v.value}</b> : v.value}
            </Typography>
          </td>
        ))}
      </tr>
    );
  }

  getAccrodionButton = (): React.ReactNode => {
    const { isOpened, t, isAccordion } = this.props;
    if (!isAccordion) {
      return null;
    }
    return isOpened ? (
      <button
        tabIndex={-1}
        title={t("Закрыть скрытый контент")}
        className={cn(classes.collapseIconButton)}
      >
        <img src={require("./assets/minus.svg")} alt={t("Иконка минус")} />
      </button>
    ) : (
      <button
        tabIndex={-1}
        title={t("Открыть скрытый контент")}
        className={cn(classes.collapseIconButton)}
      >
        <img src={require("./assets/plus.svg")} alt={t("Иконка плюс")} />
      </button>
    );
  };
}

export default withLocale(TableRow);
