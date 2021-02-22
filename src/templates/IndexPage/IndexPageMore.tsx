import React from "react";
import classes from "./IndexPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T, useLocale } from "react-targem";
import Container from "src/components/ui-kit/Container";
import { Link } from "gatsby";
import type { Article } from "../ArticleFullPage/ArticleFullPage";
import useFeatureFlag from "src/hooks/useFeatureFlag";
interface IndexPageMoreProps {
  articles: Partial<Article>[];
}

const getArticleBackground = (type?: Article["tag"]) => {
  switch (type) {
    case "Аналитика":
      return require("./assets/analytics-head.svg");
    case "Блог":
      return require("./assets/blog-head.svg");
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IndexPageMore = (props: IndexPageMoreProps) => {
  const { t, locale } = useLocale();
  const hasAnalytics = useFeatureFlag("analytics");
  if (locale !== "ru" || !hasAnalytics) {
    return null;
  }
  const { articles } = props;
  return (
    <Container>
      <div className={classes.moreTitle}>
        <div className={classes.moreTitleInner}>
          <Typography isUpperCased>
            <b>
              <T message="Больше материалов в разделе аналитика" />
            </b>
          </Typography>
        </div>
      </div>

      <div className={classes.moreWrapper}>
        {articles.map((d: Partial<Article>, i) => {
          const type = t(d.tag || "");
          return (
            <div
              key={i}
              className={cn(classes.moreItem, {
                [classes.moreItemBlog]: d.tag === "Блог",
                [classes.moreItemAnalytics]: d.tag === "Аналитика",
              })}
              style={{
                backgroundImage: `url(${getArticleBackground(d.tag)})`,
              }}
            >
              {type ? (
                <Typography
                  className={classes.moreItemType}
                  size="small"
                  isUpperCased
                  color="inverted"
                >
                  {type}
                </Typography>
              ) : null}
              <Link className={classes.moreItemInner} to={d.slug || "#"}>
                <Typography variant="h2" font="serif">
                  <b>{d.title || ""}</b>
                </Typography>
                <Typography className={classes.moreItemDescription}>
                  {d.teaser || ""}
                </Typography>
                <div className={classes.moreItemBottom}>
                  <Typography
                    className={classes.moreItemAuthor}
                    size="small"
                    isUpperCased
                  >
                    <b>{d.author || ""}</b>
                  </Typography>
                  <Typography
                    size="small"
                    isUpperCased
                    className={classes.moreItemDate}
                  >
                    <b>{d.date || ""}</b>
                  </Typography>
                </div>
              </Link>
              <div className={classes.moreItemInnerBack} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default IndexPageMore;
