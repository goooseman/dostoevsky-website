import { graphql } from "gatsby";
import React from "react";
import { IndexQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import IndexPage from "src/templates/IndexPage";

interface IndexPageProps {
  data: IndexQueryQuery;
  location: Location;
}

const Index: React.FC<IndexPageProps> = ({ data }: IndexPageProps) => {
  const meta = data.site?.meta;
  let totalConvicted = 0;
  for (const part of data.parts.edges) {
    totalConvicted += part.node.totalConvicted || 0;
  }
  // eslint-disable-next-line no-console
  console.log("Total total convicted", totalConvicted);
  return (
    <Layout>
      <Meta site={meta} />
      <IndexPage />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    parts: allApiServerData(filter: { year: { eq: 2019 } }) {
      edges {
        node {
          part
          parameters {
            totalConvicted
            totalAcquittal: acquittal
          }
        }
      }
    }
  }
`;
