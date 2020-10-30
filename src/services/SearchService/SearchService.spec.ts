import SearchService from "./SearchService";
import { SearchResult, SearchServiceAdapter } from "./SearchServiceAdapter";

let searchService: SearchService;

const searchServiceMock: SearchServiceAdapter = {
  getArticlesByText: jest.fn(),
};

beforeEach(() => {
  searchService = new SearchService(searchServiceMock);
});

const fakeSearchResult282: SearchResult[] = [
  {
    text: {
      ru: "Foo",
    },
    id: "282",
  },
];

const fakeSearchResult281: SearchResult[] = [
  {
    text: {
      ru: "Bar",
    },
    id: "281",
  },
];

const mockGetArticlesByTextResponse = (response: SearchResult[]) => {
  (searchServiceMock.getArticlesByText as jest.Mock).mockImplementationOnce(
    () => {
      return response;
    }
  );
};

describe("getAutocompleteItems", () => {
  it("should return autocomplete results for '282'", async () => {
    mockGetArticlesByTextResponse(fakeSearchResult282);
    const results = await searchService.getAutocompleteItems("282", 2019, "ru");
    expect(results).toEqual([
      {
        text: "Статья 282. Foo",
        link: "/282/2019/",
      },
    ]);
  });

  it("should return autocomplete results for '282' for different year", async () => {
    mockGetArticlesByTextResponse(fakeSearchResult282);
    const results = await searchService.getAutocompleteItems("282", 2018, "ru");
    expect(results).toEqual([
      {
        text: "Статья 282. Foo",
        link: "/282/2018/",
      },
    ]);
  });

  it("should return autocomplete results for '281'", async () => {
    mockGetArticlesByTextResponse(fakeSearchResult281);
    const results = await searchService.getAutocompleteItems("281", 2019, "ru");
    expect(results).toEqual([
      {
        text: "Статья 281. Bar",
        link: "/281/2019/",
      },
    ]);
  });
});

describe("getHelpItems", () => {
  it("should return default help items", () => {
    const result = searchService.getHelpItems("ru");
    expect(result).toEqual([
      "282",
      "282 часть 2",
      "против личности",
      "против государствa",
      "экстремизм",
      "убийство",
    ]);
  });
});
