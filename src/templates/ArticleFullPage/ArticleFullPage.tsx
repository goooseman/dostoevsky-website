/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import classes from "./ArticleFullPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import ArticleFullHead from "./ArticleFullHead";
import { ArticleTag } from "src/types";
import ArticleChartAdapter from "./components/charts/ArticleChartAdapter";
import { Counters, Counter } from "src/components/Counters";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Container from "src/components/ui-kit/Container";

export interface Article {
  body?: string;
  title: string;
  author: string;
  date: string;
  slug: string;
  tag: ArticleTag;
  teaser: string;
  locale: string;
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

      <Container>
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
            <Typography component={"span"}>
              <MDXProvider
                components={{
                  ArticleChartAdapter,
                  T,
                  Counter,
                  Counters,
                }}
              >
                <MDXRenderer>{article.body || ""}</MDXRenderer>
              </MDXProvider>
            </Typography>
          </div>
        </article>
      </Container>
    </section>
  );
};

export default ArticleFullPage;
