import { graphql } from "gatsby";
import React from "react";
import { IndexQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import IndexPage from "src/templates/IndexPage";

interface IndexPageProps {
  data: IndexQueryQuery;
  location: Location;
}

const Index: React.FC<IndexPageProps> = ({ data }: IndexPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout>
      <Meta site={meta} />
      <IndexPage />
      {/* <img
        src="https://nizrp.narod.ru/pics/dost5.jpg"
        style={{
          display: "block",
          width: "100%",
        }} 
      /> */}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
