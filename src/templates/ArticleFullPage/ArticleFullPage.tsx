/* eslint-disable react/prop-types */
import React from "react";
import classes from "./ArticleFullPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import ArticleFullHead from "./ArticleFullHead";

export interface Article {
  html?: string;
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
    <section className={cn(classes.blogContainer)}>
      {/*
      TODO: вынести в отдельный компонент BlogArticleHeader
      TODO: стили для ссылок в теле статьи нужна, сейчас - сплошной текст
      */}
      <header
        className={cn(classes.blogHeader)}
        style={{
          backgroundImage: `url(${require(`./assets/${article.type}-head.svg`)})`,
        }}
      >
        <ArticleFullHead article={article} />
      </header>
      <article className={cn(classes.blogArticle)}>
        <div className={cn(classes.articleAuthor)}>
          <Typography>
            <T message={article.author || "Аноним"} />
          </Typography>
        </div>
        <div className={cn(classes.articleDate)}>
          <Typography>
            <T message={article.date || ""} />
          </Typography>
        </div>
        <div className={cn(classes.articleBody)}>
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: article.html || "" }} />
          </Typography>
        </div>
      </article>
    </section>
  );
};

export default ArticleFullPage;
