import type ukRf from "content/ук-рф.json";

export interface I18nText {
  ru: string;
}

export interface UkRfPart {
  text: I18nText;
  url: string;
  id: number;
  minClause?: number;
  maxClause?: number;
  children?: UkRfPart[];
}

export type Part = typeof ukRf[number];
export type Section = Part["children"][number];
export type Clause = Section["children"][number];
