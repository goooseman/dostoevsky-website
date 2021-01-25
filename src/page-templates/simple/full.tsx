import { graphql } from "gatsby";
import React from "react";
import Layout from "src/components/Layout";
import { FullDatasetPageQuery } from "../../../types/graphql-types";
import Meta from "src/components/Meta";
import FullDatasetPage from "src/templates/FullDatasetPage";

interface FullDatasetPageProps {
  data: FullDatasetPageQuery;
  location: Location;
}

const FullDataset: React.FC<FullDatasetPageProps> = ({
  data,
  location,
}: FullDatasetPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout location={location}>
      <Meta site={meta} />
      <FullDatasetPage />
    </Layout>
  );
};

export default FullDataset;

export const pageQuery = graphql`
  query FullDatasetPage {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
