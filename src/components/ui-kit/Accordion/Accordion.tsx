import React, { PureComponent } from "react";
import classes from "./Accordion.module.css";
import cn from "clsx";
import { v4 as uuidv4 } from "uuid";
import Typography from "../Typography";
import { WithLocale, withLocale } from "react-targem";

interface AccordionNodeProps extends WithLocale {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpened?: boolean;
  slug?: string;
  variant: "primary" | "secondary" | "horizontal";
  onClick?: () => void;
  className?: string;
}

class AccordionNodePure extends PureComponent<AccordionNodeProps> {
  render(): React.ReactNode {
    const {
      children,
      title,
      isOpened,
      variant,
      onClick,
      className,
      slug,
    } = this.props;
    const id = uuidv4();
    return (
      <>
        <dt
          id={slug}
          className={cn(
            classes.title,
            {
              [classes.variantPrimary]: variant === "primary",
              [classes.variantHorizontal]: variant === "horizontal",
              [classes.isOpened]: isOpened,
            },
            className
          )}
        >
          {variant === "primary" ? this.getPrimaryVariantIcon() : null}

          <button
            onClick={onClick}
            className={cn(classes.titleButton)}
            aria-controls={id}
            aria-expanded={isOpened}
          >
            {variant === "primary" ? (
              <Typography variant="h3" isUpperCased>
                <b>{title}</b>
              </Typography>
            ) : (
              <Typography
                variant="h3"
                className={cn(classes.arrowIconContainer)}
              >
                {title} {this.getArrowIcon()}
              </Typography>
            )}
          </button>
        </dt>
        <dd className={cn(classes.contents)} id={id} hidden={!isOpened}>
          {children}
        </dd>
      </>
    );
  }

  getPrimaryVariantIcon = (): React.ReactNode => {
    const { isOpened, t, onClick } = this.props;
    return isOpened ? (
      <button
        tabIndex={-1}
        title={t("Закрыть скрытый контент")}
        onClick={onClick}
        className={cn(classes.variantPrimaryIcon)}
      >
        <img src={require("./assets/minus.svg")} alt={t("Иконка минус")} />
      </button>
    ) : (
      <button
        tabIndex={-1}
        title={t("Открыть скрытый контент")}
        onClick={onClick}
        className={cn(classes.variantPrimaryIcon)}
      >
        <img src={require("./assets/plus.svg")} alt={t("Иконка плюс")} />
      </button>
    );
  };

  getArrowIcon = (): React.ReactNode => {
    const { isOpened, t } = this.props;
    return isOpened ? (
      <img
        src={require("./assets/up.svg")}
        alt={t("Иконка вверх")}
        className={cn(classes.arrowIcon)}
      />
    ) : (
      <img
        src={require("./assets/down.svg")}
        alt={t("Иконка вниз")}
        className={cn(classes.arrowIcon)}
      />
    );
  };
}

export const AccordionNode = withLocale(AccordionNodePure);

interface AccordionProps {
  children: React.ReactNode;
}

class Accordion extends PureComponent<AccordionProps> {
  render(): React.ReactNode {
    return <dl className={cn(classes.container)}>{this.props.children}</dl>;
  }
}

export default Accordion;
