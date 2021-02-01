import {
  getRouteForClausePage,
  getRouteForIndexPage,
} from "../../gatsby-routing";
import { getLocale } from "src/utils/locales";

type clauseLinkTypes = "main" | "parts" | "chronology" | "full";

export const getClauseLink = (
  clause: string | number,
  year: string | number | undefined,
  type: clauseLinkTypes,
  view = "page"
): string => {
  return getRouteForClausePage(getLocale(), clause, year, type, view);
};

export type IndexPageViews =
  | "page"
  | "iframe-top-clauses"
  | "iframe-by-punishment";

export const getIndexLink = (
  year: string,
  view: IndexPageViews,
  /** without # */
  anchor?: string
): string => {
  return getRouteForIndexPage(getLocale(), year, view, anchor);
};
