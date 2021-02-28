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
            link: `/clauses#chapter-${r.id}`,
          };
        case "section":
          return {
            text: r.text[locale],
            link: `/clauses#chapter-${r.chapterId}-section-${r.id}`,
          };
        default:
          throw new Error("Unknown type");
      }
    });
  }

  getHelpItems(locale: "ru" | "en-GB"): string[] {
    if (locale === "ru") {
      return [
        "282",
        "против личности",
        "против государства",
        "экстремизм",
        "убийство",
      ];
    }
    if (locale === "en-GB") {
      return [
        "282",
        "against personality",
        "against goverment",
        "extremism",
        "murder",
      ];
    }
    return [];
  }
}

export interface SearchResult {
  text: string;
  link: string;
}

export default SearchService;
