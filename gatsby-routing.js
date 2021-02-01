const getRouteForClausePage = (locale, clauseId, year, page, view) => {
  let route = `/${locale}/${clauseId}/`;
  if (page !== "chronology") {
    route += `${year || 2019}/`;
  }
  if (page !== "main") {
    route += `${page}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  return route;
};

const getRouteForLocale = (locale, path) => {
  return `/${locale}${path}`;
};

const getRouteForIndexPage = (locale, year, view, anchor) => {
  let route = `/${locale}/`;
  if (year.toString() !== "2019") {
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
