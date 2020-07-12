import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClausePageQuery } from "types/graphql-types";
import ClausePage from "src/templates/ClausePage";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface ClauseProps {
  data: ClausePageQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
  };
}

class Clause extends PureComponent<ClauseProps> {
  render(): React.ReactNode {
    const { data, pageContext } = this.props;

    return (
      <Layout>
        <Meta site={data.site?.meta} />
        <ClausePage
          year={parseInt(pageContext.year)}
          clauseNumber={pageContext.clauseId}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClausePage($partRegex: String!, $year: String!) {
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

export default Clause;
