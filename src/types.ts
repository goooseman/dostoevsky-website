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

export type Chapter = typeof ukRf[number];
export type Section = Chapter["children"][number];
export type Clause = Section["children"][number];
