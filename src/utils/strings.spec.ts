import { removeTextInBrackets, capitalize } from "./strings";

describe("removeTextInBrackets", () => {
  it("should remove text in round brackets `()`", () => {
    expect(
      removeTextInBrackets(
        "Угроза убийством или причинением тяжкого вреда здоровью (включая ст. 119 старой редакции УК РФ)"
      )
    ).toBe("Угроза убийством или причинением тяжкого вреда здоровью");
  });
});

describe("capitalize", () => {
  it("should capitalize", () => {
    expect(capitalize("foo")).toBe("Foo");
  });
});
