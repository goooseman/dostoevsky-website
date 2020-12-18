import { graphql } from "gatsby";
import React from "react";
import Layout from "src/components/Layout";
import Meta from "src/components/Meta";
import { NoPageQuery } from "types/graphql-types";
import NoPage from "../templates/NoPage";

interface NoPageProps {
  data: NoPageQuery;
  location: Location;
}

const No: React.FC<NoPageProps> = ({ data }: NoPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout>
      <Meta site={meta} />
      <NoPage />
    </Layout>
  );
};

export default No;

export const pageQuery = graphql`
  query NoPage {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
