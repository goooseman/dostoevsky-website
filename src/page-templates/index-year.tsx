import { graphql } from "gatsby";
import React from "react";
import { IndexYearQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import IndexPage from "src/templates/IndexPage";

interface IndexPageProps {
  data: IndexYearQueryQuery;
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
  query IndexYearQuery($year: String!) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    parts: allApiServerData(filter: { year: { eq: $year } }) {
      edges {
        node {
          part
          totalConvicted
          totalAcquittal: acquittal
        }
      }
    }
  }
`;
