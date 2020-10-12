const getCsvRow = (row: string[]) => {
  return row.join("\t") + "\n";
};

export const getCsv = (
  tables: {
    columns: { isHidden?: boolean; title: string }[];
    rows: { values: { value: string | number }[] }[];
  }[],
  activeTableIndex: number
): string => {
  const table = tables[activeTableIndex];
  let result = "";
  const titleRow = getCsvRow(
    table.columns.filter((c) => !c.isHidden).map((c) => c.title)
  );
  if (titleRow !== "\n") {
    result += titleRow;
  }
  for (const row of table.rows) {
    result += getCsvRow(row.values.map((v) => v.value.toString()));
  }
  return result;
};
