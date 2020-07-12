export interface I18nText {
  ru: string;
}

export interface UkRfPart {
  text: I18nText;
  url: string;
  key: number;
  minClause?: number;
  maxClause?: number;
  children?: UkRfPart[];
}
