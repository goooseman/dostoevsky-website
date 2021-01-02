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

export type ArticleTag = "Аналитика" | "Блог";

export interface CountersByPunishment {
  /** Лишение свободы */
  primaryImprisonment: number;
  /** Условное осуждение к лишению свободы */
  primarySuspended: number;
  /** Обязательные работы */
  primaryCommunityService: number;
  /** Принудительные работы */
  primaryForcedLabour: number;
  /** Исправительные работы */
  primaryCorrectionalLabour: number;
  /** Штраф */
  primaryFine: number;
  /** Принудительные меры к невменяемым */
  coerciveMeasures: number;
  /** Условное осуждение к иным мерам */
  primaryOther: number;
}

export interface SelectOption {
  label: string;
  value: string;
}
