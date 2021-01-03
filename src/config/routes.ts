import {
  getRouteForClausePage,
  getRouteForIndexPage,
} from "../../gatsby-routing";

enum clauseLinkTypes {
  main = "",
  parts = "parts",
  chronology = "chronology",
  full = "full",
  focus = "focus",
}

export const getClauseLink = (
  clause: string | number,
  year: string | number | undefined,
  type: keyof typeof clauseLinkTypes,
  view = "page"
): string => getRouteForClausePage(clause, year, type, view);

export type IndexPageViews =
  | "page"
  | "iframe-top-clauses"
  | "iframe-by-punishment";

export const getIndexLink = (year: string, view: IndexPageViews): string =>
  getRouteForIndexPage(year, view);
