import { graphql } from "gatsby";
import React from "react";
import { AboutPageQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface AboutPageProps {
  data: AboutPageQuery;
  location: Location;
}

const Index: React.FC<AboutPageProps> = ({ data }: AboutPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout>
      <Meta site={meta} />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query AboutPage {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
