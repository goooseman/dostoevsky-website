import { graphql } from "gatsby";
import React from "react";
import { IndexQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/meta";
import Layout from "src/components/layout";

interface Props {
  data: IndexQueryQuery;
  location: Location;
}

const Index: React.FC<Props> = ({ data, location }: Props) => {
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

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
        author
        twitter
        adsense
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
