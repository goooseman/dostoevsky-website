import { SearchServiceAdapter } from "./SearchServiceAdapter";

class SearchService {
  private searchServiceAdaper: SearchServiceAdapter;

  constructor(searchServiceAdaper: SearchServiceAdapter) {
    this.searchServiceAdaper = searchServiceAdaper;
  }

  async getAutocompleteItems(
    queryString: string,
    year: string,
    locale: "ru"
  ): Promise<SearchResult[]> {
    const results = await this.searchServiceAdaper.getArticlesByText(
      queryString,
      locale
    );
    return results.map((r) => {
      switch (r.type) {
        case "clause":
          return {
            text: `Статья ${r.id}. ${r.text[locale]}`,
            link: `/${r.id}/${year}/`,
          };
        case "chapter":
          return {
            text: r.text[locale],
            link: `/clauses?chapterId=${r.id}`,
          };
        case "section":
          return {
            text: r.text[locale],
            link: `/clauses?chapterId=${r.chapterId}&sectionId=${r.id}`,
          };
        default:
          throw new Error("Unknown type");
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getHelpItems(locale: "ru"): string[] {
    return [
      "282",
      "282 часть 2",
      "против личности",
      "против государства",
      "экстремизм",
      "убийство",
    ];
  }
}

export interface SearchResult {
  text: string;
  link: string;
}

export default SearchService;
