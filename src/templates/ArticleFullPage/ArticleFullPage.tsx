/* eslint-disable react/prop-types */
import React from "react";
import classes from "./ArticleFullPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import SinglePageLayout from "src/components/SinglePageLayout";
import { T } from "react-targem";

export interface Article {
  html: string;
  title: string;
  author: string;
  date: string;
  slug: string;
  type: string;
  teaser: string;
}

export interface ArticleFullPageProps {
  article: Article;
}

const ArticleFullPage = (props: ArticleFullPageProps): JSX.Element => {
  const { article } = props;
  return (
    <Container>
      <SinglePageLayout title={article.title}>
        <div className={cn(classes.articleTitle)}>
          <Typography>
            <T message={article.title} />
          </Typography>
        </div>
        <div className={cn(classes.articleAuthor)}>
          <Typography>
            <T message={article.author} />
          </Typography>
        </div>
        <div className={cn(classes.articleDate)}>
          <Typography>
            <T message={article.date} />
          </Typography>
        </div>
        <div className={cn(classes.articleBody)}>
          <Typography>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: article.html }}
            ></div>
          </Typography>
        </div>
      </SinglePageLayout>
    </Container>
  );
};

export default ArticleFullPage;
