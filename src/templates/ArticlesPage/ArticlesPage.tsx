import React from "react";

import Container from "src/components/ui-kit/Container";
// import { Article } from "../ArticleFullPage/ArticleFullPage";
import ArticlesPageMore from "./ArticlesPageMore";
import ArticlesPageFilter from "./ArticlesPageFilter";
import type { Article } from "../ArticleFullPage/ArticleFullPage";

interface ArticlesPageProps {
  articles: Array<Article>;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = (
  props: ArticlesPageProps
) => (
  <Container>
    <ArticlesPageFilter />
    <ArticlesPageMore articles={props.articles} />
  </Container>
);

export default ArticlesPage;
