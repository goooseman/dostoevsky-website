import React from "react";
import classes from "./IndexPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T, useLocale } from "react-targem";
import Container from "src/components/ui-kit/Container";
import { Link } from "gatsby";

const getDataMock = (t: (s: string) => string) => [
  {
    type: "blog",
    title: t(
      "Как изменилось чиcло выявленных преступлений с кражей и судебных решений по ним."
    ),
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
    author: t("светлана шуранова"),
    date: t("14 июня"),
  },
  {
    type: "blog",
    title: t("Много дел, мало приговоров"),
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.",
    author: t("светлана шуранова"),
    date: t("14 июня"),
  },
  {
    type: "analytics",
    title: t("«Экономические» статьи УК РФ"),
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    author: t("светлана шуранова"),
    date: t("14 июня"),
  },
];

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

const IndexPageMore = () => {
  const { t } = useLocale();

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
        {getDataMock(t).map((d, i) => {
          const type = getTypeString(d.type, t);
          return (
            <div
              key={i}
              className={cn(classes.moreItem, {
                [classes.moreItemBlog]: d.type === "blog",
                [classes.moreItemAnalytics]: d.type === "analytics",
              })}
              style={{
                backgroundImage:
                  "url(" +
                  require(`./assets/more-${d.type}-background.svg`) +
                  ")",
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
              <Link className={classes.moreItemInner} to="#">
                <Typography variant="h2" font="serif">
                  <b>{d.title}</b>
                </Typography>
                <Typography className={classes.moreItemDescription}>
                  {d.description}
                </Typography>
                <div className={classes.moreItemBottom}>
                  <Typography size="small" isUpperCased>
                    <b>{d.author}</b>
                  </Typography>
                  <Typography
                    size="small"
                    isUpperCased
                    className={classes.moreItemDate}
                  >
                    <b>{d.date}</b>
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
