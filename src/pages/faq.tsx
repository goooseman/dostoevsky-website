import { graphql } from "gatsby";
import React from "react";
import { FaqPageQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import FaqPage from "src/templates/FaqPage";

interface FaqPageProps {
  data: FaqPageQuery;
  location: Location;
}

const Index: React.FC<FaqPageProps> = ({ data }: FaqPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout>
      <Meta site={meta} />
      <FaqPage />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query FaqPage {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
