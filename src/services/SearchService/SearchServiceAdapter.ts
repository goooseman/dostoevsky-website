export interface SearchServiceAdapter {
  getArticlesByText(query: string, locale: "ru"): Promise<SearchResult[]>;
}

export interface SearchResultClause {
  text: {
    ru: string;
  };
  id: string;
  type: "clause";
}

export interface SearchResultPart {
  text: {
    ru: string;
  };
  id: string;
  type: "part";
}
export interface SearchResultSection {
  text: {
    ru: string;
  };
  id: string;
  partId: string;
  type: "section";
}

export type SearchResult =
  | SearchResultClause
  | SearchResultPart
  | SearchResultSection;
