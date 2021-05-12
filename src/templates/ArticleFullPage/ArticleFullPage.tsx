/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import classes from "./ArticleFullPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import ArticleFullHead from "./ArticleFullHead";
import { ArticleTag } from "src/types";
import CommentsBar from "src/components/charts/CommentsBar";
import { Counters, Counter } from "src/components/Counters";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

const Drawing: React.FC = (props: { title; name; legend }) => {
  const charts = [];
  const lines = props.children.split("|");
  for (const line in lines) {
    const v = lines[line].split(" ,");
    charts.push({ value: v[1], title: v[0] });
  }
  const data = {
    title: props.title,
    charts: [{ title: props.legend, series: [charts] }],
  };
  return <CommentsBar {...data} />;
};

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
                Drawing,
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
    </section>
  );
};

export default ArticleFullPage;
