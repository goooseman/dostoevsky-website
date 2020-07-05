import { graphql } from "gatsby";
import React from "react";
import { ClausesQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface ClausesPageProps {
  data: ClausesQueryQuery;
  location: Location;
}

const Clauses: React.FC<ClausesPageProps> = ({ data }: ClausesPageProps) => {
  const meta = data.site?.meta;
  const clauses = data.allApiServerData?.edges;
  return (
    <Layout>
      <Meta site={meta} />
      {clauses.map((n) => (
        <ul key={`${n.node.part}-${n.node.year}`}>
          <li>
            <a href={`/${n.node.part}-${n.node.year}`}>
              {n.node.part} ({n.node.year})
            </a>
          </li>
        </ul>
      ))}
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
    allApiServerData(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
          part
          year
        }
      }
    }
  }
`;
