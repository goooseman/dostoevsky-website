import React, { useRef } from "react";
import classes from "./ClausePageCatalogue.module.css";
import cn from "clsx";
import { useLocale } from "react-targem";
import { getClauseLink } from "src/config/routes";
import Typography from "src/components/ui-kit/Typography";
import type { I18nText } from "src/types";
import useBodyOverflowLock from "src/hooks/useBodyOverflowLock";

interface CatalogueRowProps {
  id: number;
  activeId?: number;
  onClick?: (id: number) => void;
  text: I18nText;
  href?: string;
  isClause?: boolean;
}

const CatalogueRow: React.FC<CatalogueRowProps> = ({
  activeId,
  id,
  onClick,
  href,
  text,
  isClause,
}: CatalogueRowProps) => {
  const { t } = useLocale();
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

interface ClausePageCatalogueProps {
  parts: {
    text: I18nText;
    id: number;
  }[];
  activeChapterId?: number;
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

const ClausePageCatalogue: React.FC<ClausePageCatalogueProps> = ({
  clauses,
  parts,
  sections,
  activeChapterId,
  activeSectionId,
  activeClauseId,
  year,
  onClose,
  onPartClick,
  onSectionClick,
}: ClausePageCatalogueProps) => {
  const { locale, t } = useLocale();
  useBodyOverflowLock(true);

  return (
    <div className={cn(classes.container)}>
      <div className={cn(classes.column)}>
        {parts.map((p) => (
          <CatalogueRow
            id={p.id}
            activeId={activeChapterId}
            text={p.text}
            key={p.id}
            onClick={onPartClick}
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
                onClick={onSectionClick}
              />
            ))
          : null}
      </div>
      <div
        className={cn(classes.column)}
        key={`${activeChapterId}-${activeSectionId}`}
      >
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
};

export default ClausePageCatalogue;
