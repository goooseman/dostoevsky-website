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
            primaryLifeSentence
            primaryImprisonment
            primaryImprisonment1
            primaryImprisonment1_3
            primaryImprisonment1_2
            primaryImprisonment2_3
            primaryImprisonment3_5
            primaryImprisonment5_8
            primaryImprisonment8_10
            primaryImprisonment10_15
            primaryImprisonment15_20
            primaryImprisonmentUnderLowerLimit
            primarySuspended
            primaryMilitaryDisciplinaryUnit
            primaryArrest
            primaryRestrain
            primaryRestrictionsInMilitaryService
            primaryCorrectionalLabour
            primaryCommunityService
            primaryForcedLabour
            primaryDisqualification
            primaryFine
            primaryFine5
            primaryFine5_25
            primaryFine25_100
            primaryFine100_300
            primaryFine300_500
            primaryFine500_1M
            primaryFine1M
            primaryOther
            exemptionFromImprisonment
            exemptionAmnesty
            exemptionOther
            dismissalAmnesty
            dismissalReconciliation
            dismissalRepentance
            dismissalCourtFine
            dismissalOther

            addDisqualification
            addFine
            addFine5
            addFine5_25
            addFine25_500
            addFine100_300
            addFine300_500
            addFine500_1M
            addFine1M
            addTitlesWithdraw
            addRestrain
            noCrimeSelfDefence: noCrimeSelf_defence
            noCrimeNecessity
            noCrimeOther
            primaryFineSum
            addFineSum
          }
        }
      }
    }
  }
`;

export default ClauseFull;
