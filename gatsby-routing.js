// eslint-disable-next-line @typescript-eslint/no-var-requires
const years = require("./content/years.json");

const getRouteForClausePage = (locale, clauseId, year, page, view, anchor) => {
  let route = `/${locale}/${clauseId}/`;
  if (page !== "chronology") {
    route += `${year || years[0]}/`;
  }
  if (page !== "main") {
    route += `${page}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  if (anchor) {
    route += `#${anchor}`;
  }
  return route;
};

const getRouteForLocale = (locale, path) => {
  return `/${locale}${path}`;
};

const getRouteForIndexPage = (locale, year, view, anchor) => {
  let route = `/${locale}/`;
  if (year.toString() !== `${years[0]}`) {
    route += `${year}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  if (anchor) {
    route += `#${anchor}`;
  }
  return route;
};

const LOCALE_CODES = ["en-GB", "ru"];

const DEFAULT_LOCALE = "ru";

module.exports = {
  getRouteForClausePage,
  getRouteForIndexPage,
  getRouteForLocale,
  LOCALE_CODES,
  DEFAULT_LOCALE,
};
