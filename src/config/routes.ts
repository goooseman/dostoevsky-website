enum clauseLinkTypes {
  main = "",
  parts = "parts",
  chronology = "chronology",
  full = "full",
}

export const getClauseLink = (
  clause: string,
  year: string,
  type: keyof typeof clauseLinkTypes,
  view = "page"
): string => {
  let route = `/${clause}/${year}/`;
  if (type !== "main") {
    route += `${clauseLinkTypes[type]}/`;
  }
  if (view !== "page") {
    route += `${view}/`;
  }
  return route;
};
