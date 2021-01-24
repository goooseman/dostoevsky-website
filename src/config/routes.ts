import {
  getRouteForClausePage,
  getRouteForIndexPage,
} from "../../gatsby-routing";
import type { Locale } from "./locales";

enum clauseLinkTypes {
  main = "",
  parts = "parts",
  chronology = "chronology",
  full = "full",
  focus = "focus",
}

export const getClauseLink = (
  locale: Locale,
  clause: string | number,
  year: string | number | undefined,
  type: keyof typeof clauseLinkTypes,
  view = "page"
): string => getRouteForClausePage(locale, clause, year, type, view);

export type IndexPageViews =
  | "page"
  | "iframe-top-clauses"
  | "iframe-by-punishment";

export const getIndexLink = (
  locale: Locale,
  year: string,
  view: IndexPageViews
): string => getRouteForIndexPage(locale, year, view);
