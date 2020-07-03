import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { CasePageQueryQuery } from "types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import { T } from "react-targem";

interface CasePageProps {
  data: CasePageQueryQuery;
  location: Location;
}

class CasePage extends PureComponent<CasePageProps> {
  render(): React.ReactNode {
    const { data } = this.props;
    return (
      <Layout>
        <Meta site={data.site?.meta} />
        <div>
          <p>
            Статья: {data.apiServerCases?.part} (
            <b>{data.apiServerCases?.name}</b>)
          </p>
          <p>Год: {data.apiServerCases?.year}</p>
          <T
            message="In 2017 one man has been convicted."
            messagePlural="In 2017 {{ count }} men has been convicted."
            count={data.apiServerCases?.totalConvicted || 0}
          />
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
      }
    }
    apiServerCases(part: { eq: $part }, year: { eq: $year }) {
      part
      year
      name
      exemptionOther
      totalConvicted
    }
  }
`;

export default CasePage;
