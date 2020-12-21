import React from "react";
import classes from "./IndexPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T, useLocale } from "react-targem";
import Container from "src/components/ui-kit/Container";
import { Link } from "gatsby";
import type { Article } from "../ArticleFullPage/ArticleFullPage";

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

interface IndexPageMoreProps {
  articles: Partial<Article>[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const IndexPageMore = (props: IndexPageMoreProps) => {
  const { t } = useLocale();
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
          const type = getTypeString(d.type || "", t);
          return (
            <div
              key={i}
              className={cn(classes.moreItem, {
                [classes.moreItemBlog]: d.type === "blog",
                [classes.moreItemAnalytics]: d.type === "analytics",
              })}
              style={{
                backgroundImage: `url(${require(`./assets/${
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

export default IndexPageMore;
