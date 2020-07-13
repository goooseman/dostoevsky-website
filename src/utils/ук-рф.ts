import ukRf from "content/ук-рф.json";
import type { UkRfPart } from "src/types";

export const getClauseById = (
  clauseId: number
): {
  part?: UkRfPart;
  section?: UkRfPart;
  clause?: UkRfPart;
} => {
  const part = ukRf.find(
    (p) => p.minClause <= clauseId && p.maxClause >= clauseId
  );
  const section = part?.children.find(
    (s) => s.minClause <= clauseId && s.maxClause >= clauseId
  );
  const clause = section?.children.find((c) => c.id === clauseId);
  return { part, section, clause };
};
