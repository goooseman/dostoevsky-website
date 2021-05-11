/* eslint-disable no-console */
import { graphql } from "gatsby";
import React from "react";
import { ArticleFullQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import ArticleFullPage from "src/templates/ArticleFullPage";
import NoPage from "src/templates/NoPage";
import { MDXRenderer } from "gatsby-plugin-mdx";

interface ArticleFullPageProps {
  data: ArticleFullQuery;
  location: Location;
}

const ArticleFull: React.FC<ArticleFullPageProps> = ({
  data,
  location,
}: ArticleFullPageProps) => {
  const meta = data.site?.meta;
  const node = data.mdx;
  if (node) {
    const article: any = {
      ...node.frontmatter,
      body: node.body || "",
    };
    return (
      <Layout location={location}>
        <Meta site={meta} />
        <ArticleFullPage article={article} />
      </Layout>
    );
  } else return <NoPage />;
};

export default ArticleFull;

export const pageQuery = graphql`
  query ArticleFull($slug: String) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date
        slug
        title
        author
        date
        teaser
        tag
      }
    }
  }
`;
