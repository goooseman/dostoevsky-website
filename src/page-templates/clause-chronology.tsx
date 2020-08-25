import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClauseChronologyQuery } from "types/graphql-types";
import ClauseChronologyPage from "src/templates/ClauseChronologyPage";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface ClauseChronologyProps {
  data: ClauseChronologyQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
  };
}

class ClauseChronology extends PureComponent<ClauseChronologyProps> {
  render(): React.ReactNode {
    const { data, pageContext } = this.props;

    return (
      <Layout>
        <Meta site={data.site?.meta} />
        <ClauseChronologyPage
          year={parseInt(pageContext.year)}
          clauseNumber={pageContext.clauseId}
          parts={
            data.allApiServerData.edges.map(
              (e) => e.node
            ) as React.ComponentProps<typeof ClauseChronologyPage>["parts"]
          }
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseChronology($partRegex: String!, $year: String!) {
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
          year
          name
          exemptionOther
          totalConvicted
        }
      }
    }
  }
`;

export default ClauseChronology;
