import React, { PureComponent } from "react";
import classes from "./ClausePageCatalogue.module.css";
import cn from "clsx";
import { withLocale, WithLocale } from "react-targem";
import { getClauseLink } from "src/config/routes";
import Typography from "src/components/ui-kit/Typography";
import type { I18nText } from "src/types";
import { Helmet } from "react-helmet";

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
            alt={t("Стрелка вправо")}
          />
        ) : null}
      </a>
    </Typography>
  );
};

interface ClausePageCatalogueProps extends WithLocale {
  parts: {
    text: I18nText;
    id: number;
  }[];
  activePartId?: number;
  onPartClick: (partId: number) => void;
  sections?: {
    text: I18nText;
    id: number;
  }[];
  activeSectionId?: number;
  onSectionClick: (sectionId: number) => void;
  clauses?: {
    text: I18nText;
    id: number;
  }[];
  activeClauseId?: number;
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
      locale,
      activePartId,
      activeSectionId,
      activeClauseId,
      year,
      onClose,
      onPartClick,
      onSectionClick,
    } = this.props;

    return (
      <div className={cn(classes.container)}>
        <Helmet defer={false}>
          <title>{t("Каталог статей УК РФ")}</title>
          <meta
            name="description"
            content={t(
              "Полный перечень всех статей УК РФ, выберите статью для получения полной информации."
            )}
          />
        </Helmet>
        <div className={cn(classes.column)}>
          {parts.map((p) => (
            <CatalogueRow
              id={p.id}
              activeId={activePartId}
              text={p.text}
              key={p.id}
              onClick={onPartClick}
              t={t}
            />
          ))}
        </div>
        <div className={cn(classes.column)}>
          {sections
            ? sections.map((s) => (
                <CatalogueRow
                  id={s.id}
                  activeId={activeSectionId}
                  text={s.text}
                  key={s.id}
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
                  id={c.id}
                  activeId={activeClauseId}
                  text={c.text}
                  href={getClauseLink(
                    locale,
                    c.id.toString(),
                    year.toString(),
                    "main"
                  )}
                  key={c.id}
                  t={t}
                  isClause
                />
              ))
            : null}
        </div>
        <button
          onClick={onClose}
          className={cn(classes.closeButton)}
          aria-label={t("Закрыть")}
        >
          <img src={require("./assets/close.svg")} alt={t("Закрыть")} />
        </button>
      </div>
    );
  }
}

export default withLocale(ClausePageCatalogue);
