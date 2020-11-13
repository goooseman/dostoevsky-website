import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import ClauseMainPage, {
  ClausePartsPageViewMode,
} from "src/templates/ClauseMainPage";
import { ClauseMainQuery } from "types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import { accumulateNodes } from "src/utils/objects";

interface ClauseMainProps {
  data: ClauseMainQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
    view: ClausePartsPageViewMode;
  };
}

class ClauseMain extends PureComponent<ClauseMainProps> {
  render(): React.ReactNode {
    const { data, pageContext } = this.props;

    const props = accumulateNodes<
      ClauseMainQuery["clauses"]["edges"][number]["node"],
      ClauseMainQuery["clauses"]["edges"][number]
    >(data.clauses.edges, "part", ["year"]).map((p) => ({
      ...p,
      total:
        p.totalConvicted +
        p.dismissalAbsenceOfEvent +
        p.dismissalAmnesty +
        p.dismissalReconciliation +
        p.dismissalRepentance +
        p.dismissalCourtFine +
        p.dismissalOther +
        p.totalAcquittal +
        p.noCrimeSelfDefence +
        p.noCrimeNecessity +
        p.noCrimeOther +
        p.coerciveMeasures,
      totalCases:
        p.totalConvicted +
        p.addTotalOffences +
        p.dismissalAbsenceOfEvent +
        p.dismissalAmnesty +
        p.dismissalReconciliation +
        p.dismissalRepentance +
        p.dismissalCourtFine +
        p.dismissalOther +
        p.addDismissalOffences +
        p.addDismissalOtherOffences +
        p.totalAcquittal +
        p.coerciveMeasures +
        p.noCrimeSelfDefence +
        p.noCrimeNecessity +
        p.noCrimeOther +
        p.exemptionOther +
        p.exemptionAmnesty +
        p.exemptionFromImprisonment,
      totalDismissal:
        p.dismissalAbsenceOfEvent +
        p.dismissalAmnesty +
        p.dismissalReconciliation +
        p.dismissalRepentance +
        p.dismissalCourtFine +
        p.dismissalOther +
        p.coerciveMeasures,
      nonRehabilitating:
        p.dismissalAmnesty +
        p.dismissalReconciliation +
        p.dismissalRepentance +
        p.dismissalCourtFine +
        p.dismissalOther +
        p.addDismissalOtherOffences,
    }))[0];

    return (
      <Layout
        hasPageLayout={
          pageContext.view === "page" || pageContext.view === "table"
        }
      >
        <Meta site={data.site?.meta} />
        <ClauseMainPage
          {...props}
          view={pageContext.view}
          year={parseInt(pageContext.year)}
          clauseNumber={pageContext.clauseId}
          partsCount={data.parts.edges.length}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseMain($partRegex: String!, $year: String!, $clauseRegex: String!) {
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
    clauses: allApiServerData(
      filter: { part: { regex: $clauseRegex }, year: { eq: $year } }
    ) {
      edges {
        node {
          part
          year

          totalConvicted
          totalAcquittal: acquittal

          coerciveMeasures

          primarySuspended
          primaryRestrain

          addTotalPersons
          addTotalOffences
          addAcquittalPersons
          addAcquittalOffences
          addDismissalPersons
          addDismissalOffences
          addDismissalOtherPersons
          addDismissalOtherOffences
          addUnfitToPleadPersons
          addUnfitToPleadOffences

          dismissalAbsenceOfEvent
          dismissalAmnesty
          dismissalReconciliation
          dismissalRepentance
          dismissalCourtFine
          dismissalOther
          unfinishedOffence

          noCrimeSelfDefence: noCrimeSelf_defence
          noCrimeNecessity
          noCrimeOther

          exemptionAmnesty
          exemptionFromImprisonment
          exemptionOther
        }
      }
    }
  }
`;

export default ClauseMain;
