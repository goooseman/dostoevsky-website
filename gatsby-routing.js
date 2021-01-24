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

const getRouteForIndexPage = (locale, year, view) => {
  let route = `/${locale}/`;
  if (year.toString() !== "2019") {
    route += `${year}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  return route;
};

const LOCALE_CODES = ["en-GB", "ru"];

module.exports = {
  getRouteForClausePage,
  getRouteForIndexPage,
  LOCALE_CODES,
};
