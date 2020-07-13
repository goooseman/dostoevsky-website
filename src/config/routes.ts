enum clauseLinkTypes {
  main = "",
  parts = "parts/",
  chronology = "chronology/",
  full = "full/",
}

export const getClauseLink = (
  clause: string,
  year: string,
  type: keyof typeof clauseLinkTypes
): string => `/${clause}/${year}/${clauseLinkTypes[type]}`;
