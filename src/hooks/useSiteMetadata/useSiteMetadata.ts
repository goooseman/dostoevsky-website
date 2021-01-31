import { useStaticQuery, graphql } from "gatsby";
import { SiteSiteMetadata } from "types/graphql-types";

const useSiteMetadata = (): Pick<
  SiteSiteMetadata,
  "title" | "description" | "siteUrl" | "embedsUrl" | "netlifyUrl"
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
              embedsUrl
              netlifyUrl
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
      ) ||
      (e as Error).message.includes("It appears like Gatsby is misconfigured.")
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
