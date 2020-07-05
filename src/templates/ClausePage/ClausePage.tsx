import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClausePageQuery } from "types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import { T } from "react-targem";

interface ClausePageProps {
  data: ClausePageQuery;
  location: Location;
}

class ClausePage extends PureComponent<ClausePageProps> {
  render(): React.ReactNode {
    const { data } = this.props;
    const parts = data.allApiServerData.edges;
    const partOne = parts[0]?.node;
    if (!partOne) {
      throw new Error("No parts information");
    }
    const totalConvicted = parts.reduce(
      (curr: number, n) => curr + (n.node.totalConvicted || 0),
      0
    );

    return (
      <Layout>
        <Meta site={data.site?.meta} />
        <div>
          <p>Статья: {partOne.name}</p>
          <p>Год: {partOne.year}</p>
          <T
            message="One man has been convicted."
            messagePlural="{{ count }} men has been convicted."
            count={totalConvicted}
          />
        </div>
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

export default ClausePage;
