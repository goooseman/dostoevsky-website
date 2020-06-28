import { graphql } from "gatsby";
import React from "react";

import { IndexQueryQuery } from "../../types/graphql-types";
import Meta from "../components/meta/meta";
import Layout from "../components/layout/layout";

interface Props {
  data: IndexQueryQuery;
  location: Location;
}

const BlogIndex: React.FC<Props> = ({ data, location }: Props) => {
  const meta = data.site?.meta;
  const cases = data.allApiServerCases?.edges;
  return (
    <Layout location={location}>
      <Meta site={meta} />
      {cases.map((n) => (
        <ul key={`${n.node.part}-${n.node.year}`}>
          <li>
            <a href="/">
              {n.node.part} ({n.node.year})
            </a>
          </li>
        </ul>
      ))}
    </Layout>
  );
};

export default BlogIndex;

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
