import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { CasePageQueryQuery } from "types/graphql-types";
import Meta from "src/components/meta";
import Layout from "src/components/layout";

interface CasePageProps {
  data: CasePageQueryQuery;
  location: Location;
}

class CasePage extends PureComponent<CasePageProps> {
  render(): React.ReactNode {
    const { data } = this.props;
    return (
      <Layout location={location}>
        <Meta site={data.site?.meta} />
        <div>
          <p>Статья: {data.apiServerCases?.part}</p>
          <p>Год: {data.apiServerCases?.year}</p>
          <p>Какая-то цифра: {data.apiServerCases?.exemptionOther}</p>
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query CasePageQuery($part: String!, $year: String!) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
        author
        twitter
      }
    }
    apiServerCases(part: { eq: $part }, year: { eq: $year }) {
      part
      year
      exemptionOther
    }
  }
`;

export default CasePage;
