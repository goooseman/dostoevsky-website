import { graphql } from "gatsby";
import React from "react";
import { AboutPageQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface Props {
  data: AboutPageQuery;
  location: Location;
}

const Index: React.FC<Props> = ({ data, location }: Props) => {
  const meta = data.site?.meta;
  return (
    <Layout location={location}>
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
