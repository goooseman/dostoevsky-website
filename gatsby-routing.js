const getRouteForClausePage = (clauseId, year, page, view) => {
  let route = `/${clauseId}/`;
  if (year) {
    route += `${year}/`;
  }
  if (page !== "main") {
    route += `${page}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  return route;
};

module.exports = {
  getRouteForClausePage,
};
