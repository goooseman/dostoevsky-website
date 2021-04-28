import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import ClauseMainPage, {
  ClausePartsPageViewMode,
} from "src/templates/ClauseMainPage";
import { ClauseMainQuery } from "types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import { accumulateNodes, NoUndefinedField } from "src/utils/objects";

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
    const { data, pageContext, location } = this.props;

    const accumulatedClauses = accumulateNodes<
      ClauseMainQuery["clauses"]["edges"][number]["node"],
      ClauseMainQuery["clauses"]["edges"][number]
    >(data.clauses.edges, "year", []).map((p) => {
      const parameters = p.parameters as NoUndefinedField<typeof p.parameters>;

      return {
        ...p,
        ...parameters,
        total:
          parameters.totalConvicted +
          parameters.dismissalAbsenceOfEvent +
          parameters.dismissalAmnesty +
          parameters.dismissalReconciliation +
          parameters.dismissalRepentance +
          parameters.dismissalCourtFine +
          parameters.dismissalOther +
          parameters.totalAcquittal +
          parameters.noCrimeSelfDefence +
          parameters.noCrimeNecessity +
          parameters.noCrimeOther +
          parameters.coerciveMeasures,
        totalCases:
          parameters.totalConvicted +
          parameters.addTotalOffences +
          parameters.dismissalAbsenceOfEvent +
          parameters.dismissalAmnesty +
          parameters.dismissalReconciliation +
          parameters.dismissalRepentance +
          parameters.dismissalCourtFine +
          parameters.dismissalOther +
          parameters.addDismissalOffences +
          parameters.addDismissalOtherOffences +
          parameters.totalAcquittal +
          parameters.coerciveMeasures +
          parameters.noCrimeSelfDefence +
          parameters.noCrimeNecessity +
          parameters.noCrimeOther +
          parameters.exemptionOther +
          parameters.exemptionAmnesty +
          parameters.exemptionFromImprisonment,
        totalDismissal:
          parameters.dismissalAbsenceOfEvent +
          parameters.dismissalAmnesty +
          parameters.dismissalReconciliation +
          parameters.dismissalRepentance +
          parameters.dismissalCourtFine +
          parameters.dismissalOther +
          parameters.coerciveMeasures,
        nonRehabilitating:
          parameters.dismissalAmnesty +
          parameters.dismissalReconciliation +
          parameters.dismissalRepentance +
          parameters.dismissalCourtFine +
          parameters.dismissalOther +
          parameters.addDismissalOtherOffences,
        totalAdd:
          parameters.addDisqualification +
          parameters.addFine +
          parameters.addTitlesWithdraw +
          parameters.addRestrain,
      };
    });

    const addTotalPersons: number[] = [];

    for (const node of data.clauses.edges) {
      addTotalPersons.push(node.node.parameters?.addTotalPersons || 0);
    }

    const props = accumulatedClauses[0];

    return (
      <Layout
        location={location}
        hasPageLayout={
          pageContext.view === "page" ||
          pageContext.view === "focus" ||
          pageContext.view === "table" ||
          pageContext.view === "focus-table"
        }
      >
        <Meta site={data.site?.meta} />
        <ClauseMainPage
          {...props}
          addTotalPersons={addTotalPersons}
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
  query ClauseMain($partRegex: String!, $year: Int!, $clauseRegex: String!) {
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
          parameters {
            totalConvicted
            totalAcquittal: acquittal

            coerciveMeasures

            primarySuspended
            primaryRestrain
            primaryImprisonment
            primaryFine
            primaryCorrectionalLabour

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

            addDisqualification
            addFine
            addTitlesWithdraw
            addRestrain

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

            noCrimeNecessity
            noCrimeOther

            primaryImprisonmentUnderLowerLimit
            primaryImprisonment1
            primaryImprisonment1_2
            primaryImprisonment1_3
            primaryImprisonment2_3
            primaryImprisonment3_5
            primaryImprisonment5_8
            primaryImprisonment8_10
            primaryImprisonment10_15
            primaryImprisonment15_20

            primaryLifeSentence
            primaryArrest
            primaryRestrain2009
            primaryCommunityService
            primaryForcedLabour
            primaryDisqualification
            primaryOther
            primaryMilitaryDisciplinaryUnit
            primaryRestrictionsInMilitaryService

            dismissalAbsenceOfEvent
            dismissalReconciliation
            dismissalRepentance
            dismissalCourtFine
            dismissalOther
            dismissalRepentance2
          }
        }
      }
    }
  }
`;

export default ClauseMain;
