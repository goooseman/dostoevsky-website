/* eslint-disable react/prop-types */
import React from "react";
import classes from "./ArticleFullPage.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";
import { Link } from "gatsby";
import Container from "../../components/ui-kit/Container";

export interface Article {
  html: string;
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
      TODO: стили для ссылок в теле статьи
      T
      */}
      <header className={cn(classes.blogHeader)}>
        <Container>
          <div className={cn(classes.blogHeader__inner)}>
            <div>
              <Link to="/" className={cn(classes.blogHeader__lnk)}>
                <Typography
                  size="normal"
                  variant="b"
                  color="secondary"
                  isUpperCased
                >
                  Блог
                </Typography>
              </Link>
            </div>
            <Typography
              variant="h1"
              font="serif"
              className={cn(classes.blogHeader__title)}
              isCentered
            >
              <T message={article.title} />
            </Typography>
            <section className={cn(classes.blogHeader__share)}>
              <Typography font="serif">
                <em>
                  <T message="Поделиться:" />
                </em>
              </Typography>
              <div className={cn(classes.blogHeader__social)}>
                <Link
                  to="https://telegram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={require("./assets/telegram.svg")}
                    alt="Our Telegram page"
                  />
                </Link>
                <Link
                  to="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
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
      <article className={cn(classes.blogArticle)}>
        <div className={cn(classes.articleBody)}>
          <Typography>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: article.html }}
            ></div>
          </Typography>
        </div>
        <div className={cn(classes.articleAuthor)}>
          <Typography>
            <T message={article.author} />
          </Typography>
        </div>
        <div className={cn(classes.articleDate)}>
          <Typography>
            <T message={article.date} />
          </Typography>
        </div>
      </article>
    </section>
  );
};

export default ArticleFullPage;
