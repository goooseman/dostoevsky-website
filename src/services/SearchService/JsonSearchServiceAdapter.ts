import ukRf from "content/ук-рф.json";
import type {
  SearchResult,
  SearchServiceAdapter,
} from "./SearchServiceAdapter";

type Clause = typeof ukRf[number]["children"][number]["children"][number];

class JsonSearchAdapter implements SearchServiceAdapter {
  async getArticlesByText(query: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    for (const part of ukRf) {
      for (const section of part.children) {
        for (const clause of section.children) {
          if (clause.id.toString() === query.trim()) {
            results.push(this.transformResult(clause));
            continue;
          }
          if (clause.text.ru.toLowerCase() === query.toLowerCase().trim()) {
            results.push(this.transformResult(clause));
            continue;
          }
        }
      }
    }
    return results;
  }

  private transformResult(clause: Clause): SearchResult {
    return {
      text: clause.text,
      id: clause.id.toString(),
    };
  }
}

export default JsonSearchAdapter;
