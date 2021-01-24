import { getLinkForLocale, getLocaleFromPath } from "./locales";

describe("getLocaleFromPath", () => {
  it("should output ru for /ru", () => {
    expect(getLocaleFromPath("/ru")).toBe("ru");
  });
  it("should output ru for /ru/282/full", () => {
    expect(getLocaleFromPath("/ru/282/full")).toBe("ru");
  });
});

describe("getLinkForLocale", () => {
  it("should return a correct link for a pathname without locale", () => {
    expect(getLinkForLocale("en-GB", "/articles")).toBe("/en-GB/articles");
  });

  it("should return a correct link for a pathname with locale", () => {
    expect(getLinkForLocale("en-GB", "/ru/articles")).toBe("/en-GB/articles");
  });
});
