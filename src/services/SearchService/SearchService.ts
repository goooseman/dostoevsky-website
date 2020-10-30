import { SearchServiceAdapter } from "./SearchServiceAdapter";

class SearchService {
  private searchServiceAdaper: SearchServiceAdapter;

  constructor(searchServiceAdaper: SearchServiceAdapter) {
    this.searchServiceAdaper = searchServiceAdaper;
  }

  async getAutocompleteItems(
    queryString: string,
    year: number,
    locale: "ru"
  ): Promise<SearchResult[]> {
    const results = await this.searchServiceAdaper.getArticlesByText(
      queryString
    );
    return results.map((r) => {
      return {
        text: `Статья ${r.id}. ${r.text[locale]}`,
        link: `/${r.id}/${year}/`,
      };
    });
  }
}

interface SearchResult {
  text: string;
  link: string;
}

export default SearchService;
