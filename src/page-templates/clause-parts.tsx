import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClausePartsQuery } from "types/graphql-types";
import ClausePartsPage, {
  ClausePartsPageViewMode,
} from "src/templates/ClausePartsPage";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";

interface ClausePartsProps {
  data: ClausePartsQuery;
  location: Location;
  pageContext: {
    partRegex: string;
    year: string;
    clauseId: number;
    view: ClausePartsPageViewMode;
  };
}

class ClauseParts extends PureComponent<ClausePartsProps> {
  render(): React.ReactNode {
    const { data, pageContext } = this.props;

    return (
      <Layout
        hasPageLayout={
          pageContext.view === "page" || pageContext.view === "table"
        }
      >
        <Meta site={data.site?.meta} />
        <ClausePartsPage
          year={parseInt(pageContext.year)}
          clauseNumber={pageContext.clauseId}
          view={pageContext.view}
          parts={
            data.allApiServerData.edges.map(
              (e) => e.node
            ) as React.ComponentProps<typeof ClausePartsPage>["parts"]
          }
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseParts($partRegex: String!, $year: String!) {
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
          name
          totalConvicted
          acquittal
          dismissalAbsenceOfEvent
          dismissalAmnesty
          dismissalReconciliation
          dismissalRepentance
          dismissalCourtFine
          dismissalOther
          coerciveMeasures
          primaryLifeSentence
          primarySuspended
          primaryArrest
          primaryRestrain
          primaryRestrain2009
          primaryCorrectionalLabour
          primaryCommunityService
          primaryForcedLabour
          primaryFine
          primaryDisqualification
          primaryOther
          primaryMilitaryDisciplinaryUnit
          primaryRestrictionsInMilitaryService
          primaryImprisonment
          unfinishedOffence
          addTotalPersons
          addTotalOffences
          addAcquittalPersons
          addAcquittalOffences
          noCrimeSelf_defence
          noCrimeNecessity
          noCrimeOther
          addDisqualification
          addFine
          addTitlesWithdraw
          addRestrain
          dismissalRepentance2
          addDismissalPersons
          addDismissalOffences
          addDismissalOtherPersons
          addDismissalOtherOffences
        }
      }
    }
  }
`;

export default ClauseParts;
