/* eslint-disable no-console */
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
  let totalConvicted = 0;
  let totalDismissal = 0;
  let totalAcquittalAll = 0;
  let totalNoCrime = 0;
  for (const part of data.parts.edges) {
    totalConvicted += part.node.parameters?.totalConvicted || 0;

    if (part.node.parameters) {
      const {
        dismissalAmnesty,
        dismissalReconciliation,
        dismissalRepentance,
        dismissalCourtFine,
        dismissalOther,
        totalAcquittal,
        noCrimeSelfDefence,
        noCrimeNecessity,
        noCrimeOther,
      } = part.node.parameters;

      totalAcquittalAll += totalAcquittal || 0;

      totalDismissal +=
        (dismissalAmnesty || 0) +
        (dismissalReconciliation || 0) +
        (dismissalRepentance || 0) +
        (dismissalCourtFine || 0) +
        (dismissalOther || 0);

      totalNoCrime +=
        (noCrimeSelfDefence || 0) +
        (noCrimeNecessity || 0) +
        (noCrimeOther || 0);
    }
  }
  // eslint-disable-next-line no-console
  console.log("Total total convicted", totalConvicted);
  const counters = {
    totalConvicted,
    totalDismissal,
    totalAcquittal: totalAcquittalAll,
    totalNoCrime,
  };
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
