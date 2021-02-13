export type NoUndefinedField<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};

function isObject(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}

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
  return (result as unknown) as NoUndefinedField<N>[];
};

export const accumulateNodes = <
  N extends { [key: string]: number | string | object | undefined | null },
  O extends { node: N }
>(
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
      const index =
        result.push(({ ...item.node } as unknown) as NoUndefinedField<N>) - 1;
      map.set(item.node[keyToAccumulate], index);
      continue;
    }
    const index = map.get(item.node[keyToAccumulate]);
    const savedItem = result[index];

    for (const key of Object.keys(savedItem) as (keyof N)[]) {
      if (key === keyToAccumulate || keysToIgnore.includes(key as keyof N)) {
        continue;
      }
      if (isObject(savedItem[key])) {
        let innerObject = savedItem[key] as { [key: string]: number };
        innerObject = { ...innerObject };
        for (const secondKey of Object.keys(innerObject)) {
          innerObject[secondKey] =
            (item.node[key] as { [key: string]: number })[secondKey] +
            innerObject[secondKey];
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        savedItem[key] = innerObject;
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      savedItem[key] = item.node[key] + savedItem[key];
    }
  }
  return result;
};
