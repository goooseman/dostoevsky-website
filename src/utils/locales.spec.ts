import { getLocaleFromPath } from "./locales";

describe("getLocaleFromPath", () => {
  it("should output ru for /ru", () => {
    expect(getLocaleFromPath("/ru")).toBe("ru");
  });
  it("should output ru for /ru/282/full", () => {
    expect(getLocaleFromPath("/ru/282/full")).toBe("ru");
  });
});
