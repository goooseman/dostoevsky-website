import React, { PureComponent } from "react";
import classes from "./SpoilerText.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { withLocale, WithLocale } from "react-targem";

interface SpoilerTextProps extends WithLocale {
  text: React.ReactNode;
  isOpened: boolean;
  onArrowButtonClick: () => void;
}

class SpoilerText extends PureComponent<SpoilerTextProps> {
  render(): React.ReactNode {
    const { text, isOpened, onArrowButtonClick } = this.props;
    return (
      <div className={cn(classes.container)}>
        <button className={cn(classes.button)} onClick={onArrowButtonClick}>
          {this.getArrowIcon()}
        </button>
        <Typography
          className={cn(classes.text, { [classes.textClosed]: !isOpened })}
        >
          {text}
        </Typography>
      </div>
    );
  }

  getArrowIcon = (): React.ReactNode => {
    const { isOpened, t } = this.props;
    return isOpened ? (
      <img
        src={require("./assets/up.svg")}
        alt={t("Up icon")}
        className={cn(classes.arrowIcon)}
      />
    ) : (
      <img
        src={require("./assets/down.svg")}
        alt={t("Down icon")}
        className={cn(classes.arrowIcon)}
      />
    );
  };
}

export default withLocale(SpoilerText);
