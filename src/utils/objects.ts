export type NoUndefinedField<T> = {
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

export const accumulateNodes = <N extends Object, O extends { node: N }>(
  objects: O[],
  keyToAccumulate: keyof N,
  keysToIgnore: (keyof N)[]
): NoUndefinedField<N>[] => {
  const result: NoUndefinedField<N>[] = [];
  const map = new Map();
  for (const item of objects) {
    if (!item.node[keyToAccumulate]) {
      continue;
    }
    if (!map.has(item.node[keyToAccumulate])) {
      const index = result.push(item.node as NoUndefinedField<N>) - 1;
      map.set(item.node[keyToAccumulate], index);
      continue;
    }
    const index = map.get(item.node[keyToAccumulate]);
    const savedItem = result[index];

    for (const key of Object.keys(item.node)) {
      if (key === keyToAccumulate || keysToIgnore.includes(key as keyof N)) {
        continue;
      }
      if (typeof item.node[key] === "object" && item.node[key] !== null) {
        for (const secondKey of Object.keys(item.node[key])) {
          savedItem[key][secondKey] =
            item.node[key][secondKey] + savedItem[key][secondKey];
        }
        continue;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      savedItem[key] = item.node[key] + savedItem[key];
    }
  }
  return result;
};
