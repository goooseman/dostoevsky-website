import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClausePartsQuery } from "types/graphql-types";
import ClausePartsPage from "src/templates/ClausePartsPage";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface ClausePartsProps {
  data: ClausePartsQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
  };
}

class ClauseParts extends PureComponent<ClausePartsProps> {
  render(): React.ReactNode {
    const { data, pageContext } = this.props;

    return (
      <Layout>
        <Meta site={data.site?.meta} />
        <ClausePartsPage
          year={parseInt(pageContext.year)}
          clauseNumber={pageContext.clauseId}
          parts={data.allApiServerData.edges.map((e) => e.node)}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseParts($partRegex: String!, $year: String!) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    allApiServerData(
      filter: { part: { regex: $partRegex }, year: { eq: $year } }
    ) {
      edges {
        node {
          part
          name
        }
      }
    }
  }
`;

export default ClauseParts;
