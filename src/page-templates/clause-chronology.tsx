import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClauseChronologyQuery } from "types/graphql-types";
import ClauseChronologyPage, {
  ClauseChronologyPageViewMode,
} from "src/templates/ClauseChronologyPage";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import { accumulateNodes, NoUndefinedField } from "src/utils/objects";

interface ClauseChronologyProps {
  data: ClauseChronologyQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
    view: ClauseChronologyPageViewMode;
  };
}

class ClauseChronology extends PureComponent<ClauseChronologyProps> {
  render(): React.ReactNode {
    const { data, pageContext, location } = this.props;
    const years = accumulateNodes<
      ClauseChronologyQuery["years"]["edges"][number]["node"],
      ClauseChronologyQuery["years"]["edges"][number]
    >(data.years.edges, "year", ["part"])
      .map((p) => {
        const parameters = p.parameters as NoUndefinedField<
          typeof p.parameters
        >;
        return {
          ...p,
          ...parameters,
        };
      })
      .sort((p1, p2) => p1.year - p2.year);

    return (
      <Layout
        location={location}
        hasPageLayout={
          pageContext.view === "page" || pageContext.view === "table"
        }
      >
        <Meta site={data.site?.meta} />
        <ClauseChronologyPage
          view={pageContext.view}
          clauseNumber={pageContext.clauseId}
          partsCount={data.parts.edges.length}
          years={years}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseChronology($partRegex: String!, $clauseRegex: String!) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    parts: allApiServerData(
      filter: { part: { regex: $partRegex }, year: { eq: 2019 } }
    ) {
      edges {
        node {
          part
        }
      }
    }
    years: allApiServerData(filter: { part: { regex: $clauseRegex } }) {
      edges {
        node {
          year
          part
          parameters {
            totalConvicted
            primaryImprisonment
            primarySuspended
            primaryCommunityService
            primaryForcedLabour
            primaryCorrectionalLabour
            primaryFine
            coerciveMeasures
            primaryOther
            totalAcquittal: acquittal
            dismissalAbsenceOfEvent
            dismissalAmnesty
            dismissalRepentance
            dismissalReconciliation
            dismissalCourtFine
            dismissalOther
          }
        }
      }
    }
  }
`;

export default ClauseChronology;
