import React, { useState } from "react";
import Button from "src/components/ui-kit/Button";
import Container from "src/components/ui-kit/Container";
import { T, useLocale } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import classes from "./ArticlesPage.module.css";
import cn from "clsx";
import PillButton from "src/components/ui-kit/PillButton";
// import { Article } from "../ArticleFullPage/ArticleFullPage";

interface ArticlesFeedPageFilterProps {
  tags?: Array<string>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ArticlesFeedPageFilter = () => {
  const { t } = useLocale();
  const [articlesFilter, setArticlesFilter] = useState("");

  // TODO: get tags list from somewhere
  const tags = ["all", "blog", "analytics"];
  return (
    <Container>
      <div className={cn(classes.tags)}>
        {tags.map((o: string, i: number) => (
          <PillButton
            key={i}
            value={t(o)}
            variant={o}
            handleClick={() => setArticlesFilter(o)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ArticlesFeedPageFilter;
