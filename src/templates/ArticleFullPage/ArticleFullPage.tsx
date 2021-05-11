/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import classes from "./ArticleFullPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import ArticleFullHead from "./ArticleFullHead";
import { ArticleTag } from "src/types";

import Loading from "src/components/ui-kit/Loading";
import LineChart from "src/components/charts/LineChart";
import { Counters, Counter } from "src/components/Counters";

// import Tooltip from "../ui-kit/Tooltip";

import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

const shortcodes = { Counters, Counter, LineChart, Loading, T, Typography };

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
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{article.body || ""}</MDXRenderer>
            </MDXProvider>
          </Typography>
        </div>
      </article>
    </section>
  );
};

export default ArticleFullPage;
