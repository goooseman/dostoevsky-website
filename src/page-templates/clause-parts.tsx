import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { ClausePartsQuery } from "types/graphql-types";
import ClausePartsPage, {
  ClausePartsPageViewMode,
} from "src/templates/ClausePartsPage";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import { distinctNodes, NoUndefinedField } from "src/utils/objects";

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
    type ClausePartsPageParts = React.ComponentProps<
      typeof ClausePartsPage
    >["parts"];
    const parts: ClausePartsPageParts = distinctNodes<
      ClausePartsQuery["parts"]["edges"][number]["node"],
      ClausePartsQuery["parts"]["edges"][number]
    >(data.parts.edges, "part").map((p) => {
      const parameters = p.parameters as NoUndefinedField<typeof p.parameters>;
      return {
        ...p,
        ...parameters,
        totalDismissal:
          parameters.dismissalAbsenceOfEvent +
          parameters.dismissalAmnesty +
          parameters.dismissalReconciliation +
          parameters.dismissalRepentance +
          parameters.dismissalCourtFine +
          parameters.dismissalOther +
          parameters.coerciveMeasures,
      };
    });

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
          parts={parts}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query ClauseParts($partRegex: String!, $year: Int!) {
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
          name
          parameters {
            totalConvicted
            totalAcquittal: acquittal
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
            noCrimeSelfDefence: noCrimeSelf_defence
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
  }
`;

export default ClauseParts;
