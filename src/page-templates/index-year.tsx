import { graphql } from "gatsby";
import React from "react";
import { IndexYearQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import IndexPage from "src/templates/IndexPage";

interface IndexPageProps {
  data: IndexYearQueryQuery;
  location: Location;
}

const Index: React.FC<IndexPageProps> = ({ data }: IndexPageProps) => {
  const meta = data.site?.meta;
  const totalConvicted = 0;
  let total = 0;
  let totalDismissal = 0;
  let totalAcquittal = 0;
  let totalNoCrime = 0;
  for (const part of data.parts.edges) {
    const {
      totalConvicted,
      dismissalAmnesty,
      dismissalReconciliation,
      dismissalRepentance,
      dismissalCourtFine,
      dismissalOther,
      acquittal,
      noCrimeSelf_defence,
      noCrimeNecessity,
      noCrimeOther,
    } = part.node.parameters;
    total +=
      totalConvicted +
        dismissalAmnesty +
        dismissalReconciliation +
        dismissalRepentance +
        dismissalCourtFine +
        dismissalOther +
        acquittal +
        noCrimeSelf_defence +
        noCrimeNecessity +
        noCrimeOther || 0;
    totalDismissal +=
      dismissalAmnesty +
        dismissalReconciliation +
        dismissalRepentance +
        dismissalCourtFine +
        dismissalOther || 0;
    totalAcquittal += acquittal || 0;
    totalNoCrime += noCrimeSelf_defence + noCrimeNecessity + noCrimeOther || 0;
  }
  // eslint-disable-next-line no-console
  console.log("Total total convicted", totalConvicted);
  const counters = { total, totalDismissal, totalAcquittal, totalNoCrime };
  return (
    <Layout>
      <Meta site={meta} />
      <IndexPage counters={counters} />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexYearQuery($year: Int!) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    parts: allApiServerData(filter: { year: { eq: $year } }) {
      edges {
        node {
          part
          parameters {
            totalConvicted
            totalAcquittal: acquittal

            dismissalAbsenceOfEvent
            dismissalAmnesty
            dismissalReconciliation
            dismissalRepentance
            dismissalRepentance2
            dismissalCourtFine
            dismissalOther
            unfinishedOffence

            noCrimeSelfDefence: noCrimeSelf_defence
            noCrimeNecessity
            noCrimeOther
          }
        }
      }
    }
  }
`;
