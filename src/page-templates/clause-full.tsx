import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClauseFullQuery } from "types/graphql-types";
import ClauseFullPage from "src/templates/ClauseFullPage";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface ClauseFullProps {
  data: ClauseFullQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
  };
}

class ClauseFull extends PureComponent<ClauseFullProps> {
  render(): React.ReactNode {
    const { data, pageContext, location } = this.props;

    return (
      <Layout location={location}>
        <Meta site={data.site?.meta} />
        <ClauseFullPage
          year={parseInt(pageContext.year)}
          clauseNumber={pageContext.clauseId}
          partsCount={data.parts.edges.length}
          data={data}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseFull($partRegex: String!, $year: Int!) {
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
          parameters {
            totalConvicted
            acquittal
            addTotalPersons
            addTotalOffences
            addAcquittalPersons
            addAcquittalOffences
            dismissalAbsenceOfEvent
            addDismissalPersons
            addDismissalOffences
            dismissalOther
            addDismissalOtherPersons
            addDismissalOtherOffences
            dismissalRepentance
            dismissalCourtFine
            coerciveMeasures
            addUnfitToPleadOffences
            unfinishedOffence
          }
        }
      }
    }
  }
`;

export default ClauseFull;
