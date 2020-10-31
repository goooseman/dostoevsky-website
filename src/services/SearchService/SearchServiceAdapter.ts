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

export interface SearchResultChapter {
  text: {
    ru: string;
  };
  id: string;
  type: "chapter";
}
export interface SearchResultSection {
  text: {
    ru: string;
  };
  id: string;
  chapterId: string;
  type: "section";
}

export type SearchResult =
  | SearchResultClause
  | SearchResultChapter
  | SearchResultSection;
