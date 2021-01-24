import {
  getRouteForClausePage,
  getRouteForIndexPage,
} from "../../gatsby-routing";
import { getLocale, getLocaleFromPath } from "src/utils/locales";

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
): string => {
  return getRouteForClausePage(getLocale(), clause, year, type, view);
};

export type IndexPageViews =
  | "page"
  | "iframe-top-clauses"
  | "iframe-by-punishment";

export const getIndexLink = (year: string, view: IndexPageViews): string => {
  return getRouteForIndexPage(getLocale(), year, view);
};
