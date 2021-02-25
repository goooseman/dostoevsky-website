import iconv from "iconv-lite";

const getCsvRow = (row: string[]) => {
  return row.join("\t") + "\n";
};

export interface Table {
  columns: { isHidden?: boolean; title: string }[];
  rows: { values: { value: string | number }[] }[];
}

export const getCsv = (tables: Table[], activeTableIndex: number): Blob => {
  const table = tables[activeTableIndex];
  let result = "";
  const titleRow = getCsvRow(
    table.columns.filter((c) => !c.isHidden).map((c) => c.title)
  );
  if (titleRow !== "\n") {
    result += titleRow;
  }
  for (const row of table.rows) {
    result += getCsvRow(row.values.map((v) => v.value?.toString() || ""));
  }
  return new Blob([
    new Uint8Array(iconv.encode(result, "utf16-le", { addBOM: true })),
  ]);
};
