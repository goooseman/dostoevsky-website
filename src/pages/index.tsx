import { graphql } from "gatsby";
import React from "react";
import { IndexQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import IndexPage from "src/templates/IndexPage";
import { Article } from "src/templates/ArticleFullPage/ArticleFullPage";

interface IndexPageProps {
  data: IndexQuery;
  location: Location;
}

const Index: React.FC<IndexPageProps> = ({ data }: IndexPageProps) => {
  // common site props
  const meta = data.site?.meta;
  // counters props
  let totalConvictedAll = 0;
  let totalDismissal = 0;
  let totalAcquittalAll = 0;
  let totalNoCrime = 0;
  for (const part of data.parts.edges) {
    if (part.node.parameters) {
      const {
        totalConvicted,
        dismissalAbsenceOfEvent,
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

      totalConvictedAll += totalConvicted || 0;

      totalAcquittalAll += totalAcquittal || 0;

      totalDismissal +=
        (dismissalAbsenceOfEvent || 0) +
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
  const counters = {
    totalConvicted: totalConvictedAll,
    totalDismissal,
    totalAcquittal: totalAcquittalAll,
    totalNoCrime,
  };
  // article
  const articles: Partial<Article>[] = data.allMarkdownRemark?.edges.map(
    (a: { node: { frontmatter: Partial<Article> } }) => a.node.frontmatter
  );

  return (
    <Layout>
      <Meta site={meta} />
      <IndexPage counters={counters} articles={articles} />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query Index {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 6
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            author
            teaser
            date
            type
          }
        }
      }
    }
    parts: allApiServerData(filter: { year: { eq: 2019 } }) {
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
