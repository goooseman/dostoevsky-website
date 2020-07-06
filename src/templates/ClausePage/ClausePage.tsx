import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClausePageQuery } from "types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import { T } from "react-targem";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";

interface ClausePageProps {
  data: ClausePageQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clause: string;
  };
}

class ClausePage extends PureComponent<ClausePageProps> {
  render(): React.ReactNode {
    const { data, pageContext } = this.props;
    const parts = data.allApiServerData.edges;
    const firstPart = parts[0]?.node;
    if (!firstPart) {
      return (
        <Layout>
          <Meta site={data.site?.meta} />
          <Container>
            <Typography>
              <T
                message="No data for clause {{ clauseNumber }} for year {{ year }}"
                scope={{
                  clauseNumber: pageContext.clause,
                  year: pageContext.year,
                }}
              />
            </Typography>
          </Container>
        </Layout>
      );
    }
    const totalConvicted = parts.reduce(
      (curr: number, n) => curr + (n.node.totalConvicted || 0),
      0
    );

    return (
      <Layout>
        <Meta site={data.site?.meta} />
        <div>
          <p>Статья: {firstPart.name}</p>
          <p>Год: {firstPart.year}</p>
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
