import { graphql } from "gatsby";
import React from "react";
import { ClausesQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface Props {
  data: ClausesQueryQuery;
  location: Location;
}

const Clauses: React.FC<Props> = ({ data, location }: Props) => {
  const meta = data.site?.meta;
  const cases = data.allApiServerCases?.edges;
  return (
    <Layout location={location}>
      <Meta site={meta} />
      {cases.map((n) => (
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
    allApiServerCases(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
          part
          year
        }
      }
    }
  }
`;
