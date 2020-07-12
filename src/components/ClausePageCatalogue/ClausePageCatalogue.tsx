import React, { PureComponent } from "react";
import classes from "./ClausePageCatalogue.module.css";
import cn from "clsx";
import { withLocale, WithLocale } from "react-targem";
import { getClauseLink } from "src/config/routes";
import Typography from "src/components/ui-kit/Typography";

interface CatalogueRowProps {
  id: number;
  activeId?: number;
  onClick?: (id: number) => void;
  text: I18nText;
  t: WithLocale["t"];
  href?: string;
  isClause?: boolean;
}

const CatalogueRow: React.FC<CatalogueRowProps> = ({
  activeId,
  id,
  onClick,
  href,
  text,
  t,
  isClause,
}: CatalogueRowProps) => {
  const handleClick = () => (onClick ? onClick(id) : undefined);

  return (
    <Typography>
      <a
        onClick={handleClick}
        href={href}
        className={cn({
          [classes.active]: activeId === id,
        })}
      >
        {isClause ? <b>Статья {id}. </b> : null}
        {text.ru}
        {!isClause ? (
          <img
            className={cn(classes.arrowRight)}
            src={require("./assets/right.svg")}
            alt={t("Right arrow")}
          />
        ) : null}
      </a>
    </Typography>
  );
};

interface I18nText {
  ru: string;
}

interface ClausePageCatalogueProps extends WithLocale {
  parts: {
    text: I18nText;
    key: number;
  }[];
  activePartId?: number;
  onPartClick: (partKey: number) => void;
  sections?: {
    text: I18nText;
    key: number;
  }[];
  activeSectionId?: number;
  onSectionClick: (sectionKey: number) => void;
  clauses?: {
    text: I18nText;
    key: number;
  }[];
  activeClauseKey?: number;
  year: number;
  onClose: () => void;
}

class ClausePageCatalogue extends PureComponent<ClausePageCatalogueProps> {
  render(): React.ReactNode {
    const {
      clauses,
      parts,
      sections,
      t,
      activePartId: activePartKey,
      activeSectionId: activeSectionKey,
      activeClauseKey,
      year,
      onClose,
      onPartClick,
      onSectionClick,
    } = this.props;

    return (
      <div className={cn(classes.container)}>
        <div className={cn(classes.column)}>
          {parts.map((p) => (
            <CatalogueRow
              id={p.key}
              activeId={activePartKey}
              text={p.text}
              key={p.key}
              onClick={onPartClick}
              t={t}
            />
          ))}
        </div>
        <div className={cn(classes.column)}>
          {sections
            ? sections.map((s) => (
                <CatalogueRow
                  id={s.key}
                  activeId={activeSectionKey}
                  text={s.text}
                  key={s.key}
                  t={t}
                  onClick={onSectionClick}
                />
              ))
            : null}
        </div>
        <div className={cn(classes.column)}>
          {clauses
            ? clauses.map((c) => (
                <CatalogueRow
                  id={c.key}
                  activeId={activeClauseKey}
                  text={c.text}
                  href={getClauseLink(c.key.toString(), year.toString())}
                  key={c.key}
                  t={t}
                  isClause
                />
              ))
            : null}
        </div>
        <button
          onClick={onClose}
          className={cn(classes.closeButton)}
          aria-label={t("Close")}
        >
          <img src={require("./assets/close.svg")} alt={t("Times icon")} />
        </button>
      </div>
    );
  }
}

export default withLocale(ClausePageCatalogue);
