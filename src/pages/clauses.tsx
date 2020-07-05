import { graphql } from "gatsby";
import React from "react";
import { ClausesQueryQuery } from "../../types/graphql-types";
import Meta from "src/components/Meta";
import Layout from "src/components/Layout";
import ukRf from "content/ук-рф.json";
import years from "content/years.json";
import Typography from "src/components/ui-kit/Typography";

interface ClausesPageProps {
  data: ClausesQueryQuery;
  location: Location;
}

const Clauses: React.FC<ClausesPageProps> = ({ data }: ClausesPageProps) => {
  const meta = data.site?.meta;
  return (
    <Layout>
      <Meta site={meta} />
      {ukRf.map((part) => (
        <>
          <Typography>{part.text.ru}</Typography>
          {part.children.map((section) => (
            <>
              <Typography>{section.text.ru}</Typography>
              {section.children.map((chapter) => (
                <Typography key={chapter.key}>
                  <a href={`/${chapter.key}/${years[0]}`}>{chapter.text.ru}</a>
                </Typography>
              ))}
            </>
          ))}
        </>
      ))}
    </Layout>
  );
};

export default Clauses;

export const pageQuery = graphql`
  query ClausesQuery {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
