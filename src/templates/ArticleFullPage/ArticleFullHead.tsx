/* eslint-disable react/prop-types */
import React from "react";
import classes from "./ArticleFullHead.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import { Link } from "gatsby";
import Container from "../../components/ui-kit/Container";
import { Article } from "./ArticleFullPage";

export interface ArticleFullPageProps {
  article: Article;
}

const getArticleBackground = (type: Article["type"]) => {
  switch (type) {
    case "Аналитика":
      return require("./assets/analytics-head.svg");
    case "Блог":
      return require("./assets/blog-head.svg");
  }
};

const ArticleFullHead = (props: ArticleFullPageProps): JSX.Element => {
  const { article } = props;
  return (
    <header
      className={cn(classes.blogHeader)}
      style={{
        backgroundImage: `url(${getArticleBackground(article.type)})`,
      }}
    >
      <Container>
        <div className={cn(classes.blogHeader__inner)}>
          <Link to="/" className={cn(classes.blogHeader__lnk)}>
            <Typography
              size="normal"
              variant="b"
              color="secondary"
              isUpperCased
            >
              <T message={article.type === "blog" ? "Блог" : "Аналитика"} />
            </Typography>
          </Link>
          <Typography
            variant="h1"
            font="serif"
            className={cn(classes.blogHeader__title)}
            isCentered
          >
            <T message={article.title || ""} />
          </Typography>

          <section className={cn(classes.blogHeader__share)}>
            <Typography font="serif">
              <em>
                <T message="Поделиться:" />
              </em>
            </Typography>
            <div className={cn(classes.blogHeader__social)}>
              <Link to="https://telegram.com" target="_blank" rel="noreferrer">
                <img
                  src={require("./assets/telegram.svg")}
                  alt="Our Telegram page"
                />
              </Link>
              <Link to="https://facebook.com" target="_blank" rel="noreferrer">
                <img
                  src={require("./assets/facebook.svg")}
                  alt="Our Facebook page"
                />
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noreferrer">
                <img
                  src={require("./assets/twitter.svg")}
                  alt="Our Twitter page"
                />
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </header>
  );
};

export default ArticleFullHead;
