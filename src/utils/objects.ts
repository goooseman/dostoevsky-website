type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};

export const distinctNodes = <N extends Object, O extends { node: N }>(
  objects: O[],
  keyToDistinct: keyof N
): NoUndefinedField<N>[] => {
  const result = [];
  const map = new Map();
  for (const item of objects) {
    if (!item.node[keyToDistinct]) {
      continue;
    }
    if (!map.has(item.node[keyToDistinct])) {
      map.set(item.node[keyToDistinct], true); // set any value to Map
      result.push(item.node);
    }
  }
  return result as NoUndefinedField<N>[];
};
