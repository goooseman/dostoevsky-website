/* eslint-disable no-console */
import { graphql } from "gatsby";
import React from "react";
import { ArticlesPageQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import ArticlesPage from "src/templates/ArticlesPage/ArticlesPage";
import type { Article } from "src/templates/ArticleFullPage/ArticleFullPage";

interface ArticlesPageProps {
  data: ArticlesPageQuery;
  location: Location;
}

const ArticlesIndex: React.FC<ArticlesPageProps> = ({
  data,
}: ArticlesPageProps) => {
  const meta = data.site?.meta;
  const all = data.allMarkdownRemark || [];
  const articles = all.edges.map(({ node }) => {
    const a = { ...node.frontmatter };
    return a;
  });
  return (
    <Layout>
      <Meta site={meta} />
      <ArticlesPage articles={articles as Article[]} />
    </Layout>
  );
};

export default ArticlesIndex;

export const pageQuery = graphql`
  query ArticlesPage {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          html
          frontmatter {
            slug
            title
            author
            date
            tag
            teaser
          }
        }
      }
    }
  }
`;
