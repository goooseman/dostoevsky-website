import { graphql } from "gatsby";
import React from "react";
import { FaqPageQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface Props {
  data: FaqPageQuery;
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
