import { accumulateNodes } from "./objects";

describe("accumulateNodes", () => {
  it("should accumulate all objects in the array which has a common key", () => {
    const arr = [
      { node: { key: "1", count: 1 } },
      { node: { key: "1", count: 10 } },
      { node: { key: "2", count: 1 } },
    ];
    expect(accumulateNodes(arr, "key", [])).toEqual([
      { key: "1", count: 11 },
      { key: "2", count: 1 },
    ]);
  });

  it("should not accumulate fields specified in keysToIgnore", () => {
    const arr = [
      { node: { key: "1", count: 1, part: "2012ч2" } },
      { node: { key: "1", count: 10, part: "2012ч2" } },
      { node: { key: "2", count: 1, part: "2012ч2" } },
    ];
    expect(accumulateNodes(arr, "key", ["part"])).toEqual([
      { key: "1", count: 11, part: "2012ч2" },
      { key: "2", count: 1, part: "2012ч2" },
    ]);
  });

  it("should also accumulate keys specified in the nested parameters object", () => {
    const arr = [
      { node: { key: "1", parameters: { count: 1 } } },
      { node: { key: "1", parameters: { count: 10 } } },
      { node: { key: "2", parameters: { count: 1 } } },
    ];
    expect(accumulateNodes(arr, "key", [])).toEqual([
      { key: "1", parameters: { count: 11 } },
      { key: "2", parameters: { count: 1 } },
    ]);
  });

  it("should not mutate the original array", () => {
    const arr = [
      { node: { key: "1", parameters: { count: 1 } } },
      { node: { key: "1", parameters: { count: 10 } } },
      { node: { key: "2", parameters: { count: 1 } } },
    ];
    accumulateNodes(arr, "key", []);
    expect(arr).toEqual([
      { node: { key: "1", parameters: { count: 1 } } },
      { node: { key: "1", parameters: { count: 10 } } },
      { node: { key: "2", parameters: { count: 1 } } },
    ]);
  });
});
