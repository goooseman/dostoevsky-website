export interface SearchServiceAdapter {
  getArticlesByText(query: string): Promise<SearchResult[]>;
}

export interface SearchResult {
  text: {
    ru: string;
  };
  id: string;
}
