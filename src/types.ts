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
