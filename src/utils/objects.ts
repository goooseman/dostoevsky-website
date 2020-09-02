export const distinctNodes = <N extends Object, O extends { node: N }>(
  objects: O[],
  keyToDistinct: keyof N
): N[] => {
  const result = [];
  const map = new Map();
  for (const item of objects) {
    if (!map.has(item.node[keyToDistinct])) {
      map.set(item.node[keyToDistinct], true); // set any value to Map
      result.push(item.node);
    }
  }
  return result;
};
