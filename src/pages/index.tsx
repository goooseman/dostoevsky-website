import { graphql } from "gatsby";
import React from "react";
import { IndexQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import IndexPage from "src/templates/IndexPage";
import { Article } from "src/templates/ArticleFullPage/ArticleFullPage";
import {
  getIndexCountersFromData,
  getIndexTopClausesByConvictedFromData,
} from "src/utils/index-page";
import { IndexPageViews } from "src/config/routes";

interface IndexPageProps {
  data: IndexQuery;
  location: Location;
  pageContext: {
    view: IndexPageViews;
  };
}

const Index: React.FC<IndexPageProps> = ({
  data,
  pageContext,
}: IndexPageProps) => {
  // common site props
  const meta = data.site?.meta;

  // articles preview
  const articles: Partial<Article>[] = (data.allMarkdownRemark?.edges).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any) => a.node.frontmatter
  );

  return (
    <Layout hasPageLayout={pageContext.view === "page"}>
      <Meta site={meta} />
      <IndexPage
        counters={getIndexCountersFromData(data)}
        topClauses={getIndexTopClausesByConvictedFromData(data)}
        articles={articles}
        /* if you change this, change year in the grapql query */
        currentSelectedYear={2019}
        view={pageContext.view}
      />
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
            tag
          }
        }
      }
    }
    parts: allApiServerData(filter: { year: { eq: 2019 } }) {
      edges {
        node {
          name
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

            primaryImprisonment
            primarySuspended
            primaryCommunityService
            primaryForcedLabour
            primaryCorrectionalLabour
            primaryFine
            coerciveMeasures
            primaryOther
          }
        }
      }
    }
  }
`;
