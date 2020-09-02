enum clauseLinkTypes {
  main = "",
  parts = "parts",
  chronology = "chronology",
  full = "full",
}

export const getClauseLink = (
  clause: string | number,
  year: string | number | undefined,
  type: keyof typeof clauseLinkTypes,
  view = "page"
): string => {
  let route = `/${clause}/`;
  if (year) {
    route += `${year}/`;
  }
  if (type !== "main") {
    route += `${clauseLinkTypes[type]}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  return route;
};
