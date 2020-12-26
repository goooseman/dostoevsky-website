import React, { useMemo, useState } from "react";

import Container from "src/components/ui-kit/Container";
// import { Article } from "../ArticleFullPage/ArticleFullPage";
import ArticlesPageMore from "./ArticlesPageMore";
import ArticlesPageFilter from "./ArticlesPageFilter";
import type { Article } from "../ArticleFullPage/ArticleFullPage";
import { ArticleTag } from "src/types";

interface ArticlesPageProps {
  articles: Array<Article>;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  articles,
}: ArticlesPageProps) => {
  const [articlesFilter, setArticlesFilter] = useState<
    ArticleTag | undefined
  >();

  const filteredArticles = useMemo(() => {
    if (!articlesFilter) {
      return articles;
    }
    return articles.filter((a) => a.tag === articlesFilter);
  }, [articles, articlesFilter]);

  const handleFilterChange = (newFilter?: ArticleTag) => {
    setArticlesFilter((oldFilter?: ArticleTag) => {
      if (oldFilter === newFilter) {
        return undefined;
      }
      return newFilter;
    });
  };

  return (
    <Container>
      <ArticlesPageFilter
        currentFilter={articlesFilter}
        onFilterChange={handleFilterChange}
      />
      <ArticlesPageMore articles={filteredArticles} />
    </Container>
  );
};

export default ArticlesPage;
