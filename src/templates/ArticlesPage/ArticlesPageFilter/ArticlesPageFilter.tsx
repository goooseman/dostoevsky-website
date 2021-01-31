import React from "react";
import Container from "src/components/ui-kit/Container";
import { useLocale } from "react-targem";
import classes from "./ArticlesPageFilter.module.css";
import cn from "clsx";
import PillButton, {
  PillButtonVariant,
} from "src/components/ui-kit/PillButton";
import { graphql, useStaticQuery } from "gatsby";
import { ArticleTag } from "src/types";
import { Helmet } from "react-helmet";

interface ArticlesFeedPageFilterProps {
  currentFilter?: ArticleTag;
  onFilterChange: (tagName?: ArticleTag) => void;
}

const getPillButtonVariant = (tag: ArticleTag): PillButtonVariant => {
  switch (tag) {
    case "Аналитика":
      return "analytics";
    case "Блог":
      return "blog";
    default:
      return "black";
  }
};

export const ArticlesFeedPageFilter: React.FC<ArticlesFeedPageFilterProps> = ({
  onFilterChange,
  currentFilter,
}: ArticlesFeedPageFilterProps) => {
  const { t } = useLocale();
  const data = useStaticQuery(
    graphql`
      query BlogTags {
        allMarkdownRemark {
          distinct(field: frontmatter___tag)
        }
      }
    `
  );

  const tags = data.allMarkdownRemark.distinct;

  return (
    <Container>
      <div className={cn(classes.tags)}>
        <Helmet defer={false}>
          <title>{t("Аналитика")}</title>
          <meta
            name="description"
            content={t("Блог аналитических статей от наших специалистов")}
          />
        </Helmet>
        <PillButton
          value={t("Все")}
          isActive={Boolean(currentFilter)}
          variant="black"
          onClick={() => onFilterChange()}
        />
        {tags.map((o: ArticleTag) => (
          <PillButton
            key={o}
            value={t(o)}
            isActive={o === currentFilter}
            variant={getPillButtonVariant(o)}
            onClick={() => onFilterChange(o)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ArticlesFeedPageFilter;
