import JsonSearchServiceAdapter from "./JsonSearchServiceAdapter";
import SearchService from "./SearchService";

const jsonSearchServiceAdapter = new JsonSearchServiceAdapter();
const searchService = new SearchService(jsonSearchServiceAdapter);

export default searchService;
export type { SearchResult } from "./SearchService";
