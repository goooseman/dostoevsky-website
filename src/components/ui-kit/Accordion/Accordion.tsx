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
  variant: "primary" | "secondary";
  onClick?: () => void;
}

class AccordionNodePure extends PureComponent<AccordionNodeProps> {
  render(): React.ReactNode {
    const { children, title, isOpened, variant, onClick } = this.props;
    const id = uuidv4();
    return (
      <>
        <dt
          className={cn(classes.title, {
            [classes.variantPrimary]: variant === "primary",
            [classes.isOpened]: isOpened,
          })}
        >
          {variant === "primary" ? this.getPrimaryVariantIcon() : null}

          <button
            onClick={onClick}
            className={cn(classes.titleButton)}
            aria-controls={id}
            aria-expanded={isOpened}
          >
            <Typography>
              {variant === "primary" ? <b>{title}</b> : title}

              {variant === "secondary" ? this.getSecondaryVariantIcon() : null}
            </Typography>
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
        title={t("Close hidden content")}
        onClick={onClick}
        className={cn(classes.variantPrimaryIcon)}
      >
        <img src={require("./assets/minus.svg")} alt={t("Minus icon")} />
      </button>
    ) : (
      <button
        tabIndex={-1}
        title={t("Open hidden content")}
        onClick={onClick}
        className={cn(classes.variantPrimaryIcon)}
      >
        <img src={require("./assets/plus.svg")} alt={t("Plus icon")} />
      </button>
    );
  };

  getSecondaryVariantIcon = (): React.ReactNode => {
    const { isOpened, t } = this.props;
    return isOpened ? (
      <img
        src={require("./assets/up.svg")}
        alt={t("Up icon")}
        className={cn(classes.variantSecondaryIcon)}
      />
    ) : (
      <img
        src={require("./assets/down.svg")}
        alt={t("Down icon")}
        className={cn(classes.variantSecondaryIcon)}
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
    return <dl>{this.props.children}</dl>;
  }
}

export default Accordion;
