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
        case "part":
          return {
            text: r.text[locale],
            link: `/clauses?partId=${r.id}`,
          };
        case "section":
          return {
            text: r.text[locale],
            link: `/clauses?partId=${r.partId}&sectionId=${r.id}`,
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
      "против государствa",
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
