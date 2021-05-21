/* eslint-disable no-console */
import { graphql } from "gatsby";
import React from "react";
import { ArticleFullQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import ArticleFullPage from "src/templates/ArticleFullPage";
import NoPage from "src/templates/NoPage";

interface ArticleFullPageProps {
  data: ArticleFullQuery;
  location: Location;
  url: string;
}

const ArticleFull: React.FC<ArticleFullPageProps> = ({
  data,
  location,
}: ArticleFullPageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const meta = data.site!.meta!;
  const node = data.mdx;
  if (node) {
    const article = {
      ...node.frontmatter,
      body: node.body || "",
    };
    const url = `${meta.siteUrl}${location.pathname ? location.pathname : ""}`;
    return (
      <Layout location={location}>
        <Meta site={meta} />
        <ArticleFullPage article={article} url={url} />
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
        locale
      }
    }
  }
`;
