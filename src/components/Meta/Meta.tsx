import React from "react";
import { Helmet } from "react-helmet";

import { SiteSiteMetadata } from "../../../types/graphql-types";

interface Props {
  site:
    | Pick<SiteSiteMetadata, "title" | "description" | "siteUrl">
    | null
    | undefined;
  title?: string;
}

const Meta: React.FC<Props> = ({ site, title }: Props) => {
  const siteTitle = site?.title || "";
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  return (
    <Helmet
      title={pageTitle}
      meta={[{ property: "og:type", content: "website" }]}
    />
  );
};
export default Meta;
