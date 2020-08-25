import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import ClauseMainPage from "src/templates/ClauseMainPage";
import { ClauseMainQuery } from "types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface ClauseMainProps {
  data: ClauseMainQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
  };
}

class ClauseMain extends PureComponent<ClauseMainProps> {
  render(): React.ReactNode {
    const { data, pageContext } = this.props;

    return (
      <Layout>
        <Meta site={data.site?.meta} />
        <ClauseMainPage
          year={parseInt(pageContext.year)}
          clauseNumber={pageContext.clauseId}
          partsCount={data.parts.edges.length}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseMain($partRegex: String!, $year: String!) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    parts: allApiServerData(
      filter: { part: { regex: $partRegex }, year: { eq: $year } }
    ) {
      edges {
        node {
          part
        }
      }
    }
  }
`;

export default ClauseMain;
