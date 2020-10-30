import JsonSearchServiceAdapter from "./JsonSearchServiceAdapter";

let jsonSearchServiceAdapter: JsonSearchServiceAdapter;

beforeEach(() => {
  jsonSearchServiceAdapter = new JsonSearchServiceAdapter();
});

it("should return search result for article 282", async () => {
  const results = await jsonSearchServiceAdapter.getArticlesByText("282");
  expect(results).toEqual([
    {
      text: {
        ru:
          "Возбуждение ненависти либо вражды, а равно унижение человеческого достоинства",
      },
      id: "282",
    },
  ]);
});

it("should return search result for article 281", async () => {
  const results = await jsonSearchServiceAdapter.getArticlesByText("281");
  expect(results).toEqual([
    {
      text: {
        ru: "Диверсия",
      },
      id: "281",
    },
  ]);
});

it("should return search result for query '281 '", async () => {
  const results = await jsonSearchServiceAdapter.getArticlesByText("281 ");
  expect(results).toEqual([
    {
      text: {
        ru: "Диверсия",
      },
      id: "281",
    },
  ]);
});

it("should return search result for query 'Диверсия'", async () => {
  const results = await jsonSearchServiceAdapter.getArticlesByText("Диверсия");
  expect(results).toEqual([
    {
      text: {
        ru: "Диверсия",
      },
      id: "281",
    },
  ]);
});

it("should return search result for query 'диверсия'", async () => {
  const results = await jsonSearchServiceAdapter.getArticlesByText("диверсия");
  expect(results).toEqual([
    {
      text: {
        ru: "Диверсия",
      },
      id: "281",
    },
  ]);
});

it("should return search result for query 'диверсия '", async () => {
  const results = await jsonSearchServiceAdapter.getArticlesByText("диверсия ");
  expect(results).toEqual([
    {
      text: {
        ru: "Диверсия",
      },
      id: "281",
    },
  ]);
});
