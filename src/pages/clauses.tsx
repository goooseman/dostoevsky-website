import { graphql } from "gatsby";
import React from "react";
import { ClausesQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import ukRf from "content/ук-рф.json";
import years from "content/years.json";
import ClausesPage from "src/templates/ClausesPage";

interface ClausesPageProps {
  data: ClausesQueryQuery;
  location: Location;
}

const Clauses: React.FC<ClausesPageProps> = ({
  data,
  location,
}: ClausesPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout location={location}>
      <Meta site={meta} />
      <ClausesPage parts={ukRf} actualYear={years[0]} />
    </Layout>
  );
};

export default Clauses;

export const pageQuery = graphql`
  query ClausesQuery {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
