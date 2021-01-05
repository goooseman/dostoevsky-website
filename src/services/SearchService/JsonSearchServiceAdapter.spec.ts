import JsonSearchServiceAdapter from "./JsonSearchServiceAdapter";

let jsonSearchServiceAdapter: JsonSearchServiceAdapter;

beforeEach(() => {
  jsonSearchServiceAdapter = new JsonSearchServiceAdapter();
});

describe("clauses", () => {
  const clause282 = {
    text: {
      ru:
        "Возбуждение ненависти либо вражды, а равно унижение человеческого достоинства",
    },
    id: "282",
    type: "clause",
  };

  it("should return search result for article 282", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "282",
      "ru"
    );
    expect(results).toContainEqual(clause282);
  });

  it("should return search result for 'Возбуждение ненависти'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "Возбуждение ненависти",
      "ru"
    );
    expect(results).toContainEqual(clause282);
  });

  const clause282And1 = {
    id: "282.1",
    text: { ru: "Организация экстремистского сообщества" },
    type: "clause",
  };

  it("should also find 282.1 search result for '282'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "282",
      "ru"
    );
    expect(results).toContainEqual(clause282And1);
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
    expect(results).toContainEqual(clause281Response[0]);
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

  const clause280 = {
    id: "280",
    text: {
      ru: "Публичные призывы к осуществлению экстремистской деятельности",
    },
    type: "clause",
  };

  it("should return search result for query 'экстремизм'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "экстремизм",
      "ru"
    );
    expect(results).toContainEqual(clause280);
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

  const part10 = {
    id: "10",
    text: { ru: "Преступления против государственной власти" },
    type: "chapter",
  };

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

  it("should return search result for query 'против государства'", async () => {
    const results = await jsonSearchServiceAdapter.getArticlesByText(
      "против государства",
      "ru"
    );
    expect(results).toContainEqual(part10);
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
