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

const About: React.FC<AboutPageProps> = ({
  data,
  location,
}: AboutPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout location={location}>
      <Meta site={meta} />
      <AboutPage />
    </Layout>
  );
};

export default About;

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
