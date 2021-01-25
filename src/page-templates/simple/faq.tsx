import { graphql } from "gatsby";
import React from "react";
import { FaqPageQuery } from "../../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import FaqPage from "src/templates/FaqPage";

interface FaqPageProps {
  data: FaqPageQuery;
  location: Location;
}

const Faq: React.FC<FaqPageProps> = ({ data, location }: FaqPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout location={location}>
      <Meta site={meta} />
      <FaqPage />
    </Layout>
  );
};

export default Faq;

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
