import {
  getRouteForClausePage,
  getRouteForIndexPage,
} from "../../gatsby-routing";

type clauseLinkTypes = "main" | "parts" | "chronology" | "full";

export const getClauseLink = (
  locale: string,
  clause: string | number,
  year: string | number | undefined,
  type: clauseLinkTypes,
  view = "page",
  /** without # */
  anchor?: string
): string => {
  return getRouteForClausePage(locale, clause, year, type, view, anchor);
};

export type IndexPageViews =
  | "page"
  | "iframe-top-clauses"
  | "iframe-by-punishment";

export const getIndexLink = (
  locale: string,
  year: string,
  view: IndexPageViews,
  /** without # */
  anchor?: string
): string => {
  return getRouteForIndexPage(locale, year, view, anchor);
};
