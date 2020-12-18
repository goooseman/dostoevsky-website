import React from "react";
import { Link } from "gatsby";
import cn from "clsx";
import { useLocale } from "react-targem";

import Typography from "src/components/ui-kit/Typography";
import Container from "src/components/ui-kit/Container";
import type { Article } from "../ArticleFullPage/ArticleFullPage";
import classes from "./ArticlesPage.module.css";

const getTypeString = (type: string, t: (s: string) => string) => {
  switch (type) {
    case "blog":
      return t("блог");
    case "analytics":
      return t("аналитика");
    default:
      return null;
  }
};

interface FeedPageMoreProps {
  articles: Array<Article>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ArticlesFeedPageMore = (props: FeedPageMoreProps) => {
  const { t } = useLocale();
  const { articles } = props;
  return (
    <Container>
      <div className={classes.moreWrapper}>
        {articles.map((d: Article, i) => {
          const type = getTypeString(d.type || "", t);
          return (
            <div
              key={i}
              className={cn(classes.moreItem, {
                [classes.moreItemBlog]: d.type === "blog",
                [classes.moreItemAnalytics]: d.type === "analytics",
              })}
              style={{
                backgroundImage: `url(${require(`src/templates/ArticleFullPage/assets/${
                  d.type || "blog"
                }-head.svg`)})`,
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
                  <Typography size="small" isUpperCased>
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

export default ArticlesFeedPageMore;
