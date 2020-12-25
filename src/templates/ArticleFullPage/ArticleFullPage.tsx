/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
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
  tag: string;
  teaser: string;
}

export interface ArticleFullPageProps {
  article: Article;
}

const ArticleFullPage = (props: ArticleFullPageProps): JSX.Element => {
  const { article } = props;

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://public.flourish.studio/resources/embed.js";
    document
      .querySelectorAll("div.flourish-embed")
      .forEach((el) => el.appendChild(script));
  }, []);

  return (
    <section className={cn(classes.blogContainer)}>
      <ArticleFullHead article={article} />
      <article className={cn(classes.blogArticle)}>
        <div className={cn(classes.blogArticle__date)}>
          <Typography isUpperCased isCentered>
            <T message={article.date || ""} />
          </Typography>
        </div>
        <div className={cn(classes.blogArticle__author)}>
          <Typography isCentered>
            <T message={article.author || "Аноним"} />
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
