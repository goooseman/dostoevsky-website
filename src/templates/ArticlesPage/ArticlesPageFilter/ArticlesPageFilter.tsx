import React, { useState } from "react";
import Container from "src/components/ui-kit/Container";
import { useLocale } from "react-targem";
import classes from "./ArticlesPageFilter.module.css";
import cn from "clsx";
import PillButton from "src/components/ui-kit/PillButton";
import { graphql, useStaticQuery } from "gatsby";

interface ArticlesFeedPageFilterProps {
  tags?: Array<string>;
}

export const ArticlesFeedPageFilter: React.FC = () => {
  const { t } = useLocale();
  const [, setArticlesFilter] = useState("");
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
        {tags.map((o: string, i: number) => (
          <PillButton
            key={i}
            value={t(o)}
            variant={o}
            onClick={() => setArticlesFilter(o)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ArticlesFeedPageFilter;
