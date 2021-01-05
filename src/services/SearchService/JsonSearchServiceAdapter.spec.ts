import JsonSearchServiceAdapter from "./JsonSearchServiceAdapter";

let jsonSearchServiceAdapter: JsonSearchServiceAdapter;

beforeEach(() => {
  jsonSearchServiceAdapter = new JsonSearchServiceAdapter();
});

describe("clauses", () => {
  const clause282Response = [
    {
      text: {
        ru:
          "Возбуждение ненависти либо вражды, а равно унижение человеческого достоинства",
      },
      id: "282",
      type: "clause",
    },
  ];

  it("should return search result for article 282", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "282",
      "ru"
    );
    expect(results).toEqual(clause282Response);
  });

  it("should return search result for 'Возбуждение ненависти'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "Возбуждение ненависти",
      "ru"
    );
    expect(results).toEqual(clause282Response);
  });

  const clause281Response = [
    {
      text: {
        ru: "Диверсия",
      },
      id: "281",
      type: "clause",
    },
  ];
  it("should return search result for article 281", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "281",
      "ru"
    );
    expect(results).toEqual(clause281Response);
  });

  it("should return search result for query '281 '", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "281 ",
      "ru"
    );
    expect(results).toEqual(clause281Response);
  });

  it("should return search result for query 'Диверсия'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "Диверсия",
      "ru"
    );
    expect(results).toEqual(clause281Response);
  });

  it("should return search result for query 'диверсия'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "диверсия",
      "ru"
    );
    expect(results).toEqual(clause281Response);
  });

  it("should return search result for query 'диверсия '", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "диверсия ",
      "ru"
    );
    expect(results).toEqual(clause281Response);
  });
});

describe("parts", () => {
  const part7Response = [
    {
      text: {
        ru: "Преступления против личности",
      },
      id: "7",
      type: "chapter",
    },
  ];
  it("should return search result for query 'Преступления против личности'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "Преступления против личности",
      "ru"
    );
    expect(results).toEqual(part7Response);
  });
  it("should return search result for query 'преступления против личности'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "преступления против личности",
      "ru"
    );
    expect(results).toEqual(part7Response);
  });
  it("should return search result for query 'преступления против личности '", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "преступления против личности ",
      "ru"
    );
    expect(results).toEqual(part7Response);
  });

  it("should return search result for query 'преступления личности'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "преступления личности",
      "ru"
    );
    expect(results).toContainEqual(part7Response[0]);
  });
});

describe("sections", () => {
  const section16Response = [
    {
      text: {
        ru: "Преступления против жизни и здоровья",
      },
      id: "16",
      chapterId: "7",
      type: "section",
    },
  ];
  it("should return search result for query 'Преступления против жизни и здоровья'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "Преступления против жизни и здоровья",
      "ru"
    );
    expect(results).toEqual(section16Response);
  });
  it("should return search result for query 'преступления против жизни и здоровья'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "преступления против жизни и здоровья",
      "ru"
    );
    expect(results).toEqual(section16Response);
  });
  it("should return search result for query 'преступления против жизни и здоровья '", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "преступления против жизни и здоровья ",
      "ru"
    );
    expect(results).toEqual(section16Response);
  });
  it("should return search result for query 'против жизни и зд'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "против жизни и зд",
      "ru"
    );
    expect(results).toEqual(section16Response);
  });
});
