import React from "react";

import Container from "src/components/ui-kit/Container";
import { Article } from "../ArticleFullPage/ArticleFullPage";
import ArticlesPageMore from "./ArticlesPageMore";
import ArticlesPageFilter from "./ArticlesPageFilter";

interface ArticlesPageProps {
  articles: Array<Article>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ArticlesPage = (props: ArticlesPageProps) => (
  <Container>
    <ArticlesPageFilter />
    <ArticlesPageMore articles={props.articles} />
  </Container>
);

export default ArticlesPage;
