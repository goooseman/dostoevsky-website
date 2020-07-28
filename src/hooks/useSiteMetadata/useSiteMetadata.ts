import { useStaticQuery, graphql } from "gatsby";
import { SiteSiteMetadata } from "types/graphql-types";

const useSiteMetadata = (): Pick<
  SiteSiteMetadata,
  "title" | "description" | "siteUrl"
> => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { site } = useStaticQuery(
      graphql`
        query SiteMetadata {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `
    );

    return site.siteMetadata;
  } catch (e) {
    if (
      (e as Error).message.includes(
        "The result of this StaticQuery could not be fetched."
      )
    ) {
      return {
        title: "Storybook Gatsby",
        description: "Descritpion of website",
        siteUrl: "https://example.com",
      };
    }
    throw e;
  }
};

export default useSiteMetadata;
