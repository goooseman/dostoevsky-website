import React, { useState } from "react";
import Container from "src/components/ui-kit/Container";
import { useLocale } from "react-targem";
import classes from "./ArticlesPageFilter.module.css";
import cn from "clsx";
import PillButton from "src/components/ui-kit/PillButton";

interface ArticlesFeedPageFilterProps {
  tags?: Array<string>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ArticlesFeedPageFilter = () => {
  const { t } = useLocale();
  const [, setArticlesFilter] = useState("");

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
            onClick={() => setArticlesFilter(o)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ArticlesFeedPageFilter;
