const getRouteForClausePage = (clauseId, year, page, view) => {
  let route = `/${clauseId}/`;
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

const getRouteForIndexPage = (year, view) => {
  let route = `/`;
  if (year.toString() !== "2019") {
    route += `${year}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  return route;
};

module.exports = {
  getRouteForClausePage,
  getRouteForIndexPage,
};
