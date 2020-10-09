import { graphql } from "gatsby";
import React from "react";
import Layout from "src/components/Layout";
import { AboutPageQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import AboutPage from "src/templates/AboutPage";

interface AboutPageProps {
  data: AboutPageQuery;
  location: Location;
}

const Index: React.FC<AboutPageProps> = ({ data }: AboutPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout>
      <Meta site={meta} />
      <AboutPage />
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
