type NullableArray<T> = ArrayLike<T> | null;

export const indeces = {
  empty: 0,
  first: 0,
  lastIndexSubtrahend: 1
};

export const any = <T>(array: NullableArray<T>): boolean => (array && array.length > indeces.empty) || false;

export const isEmpty = <T>(array: NullableArray<T>): boolean => !any(array);

export const firstOrDefault = <T>(array: NullableArray<T>, defaultValue: T | null = null): T | null =>
  (array && array[indeces.first]) || defaultValue;

export const first = <T>(array: NullableArray<T>): T | undefined => firstOrDefault(array) || undefined;

export const lastOrDefault = <T>(array: NullableArray<T>, defaultValue: T | null = null): T | null =>
  (array && array[array.length - indeces.lastIndexSubtrahend]) || defaultValue;

export const last = <T>(array: NullableArray<T>): T | undefined => lastOrDefault(array) || undefined;

export const takeWhile = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  const items: T[] = [];

  for (const item of array) {
    if (!predicate(item)) {
      break;
    }

    items.push(item);
  }

  return items;
};

export const takeWhileAll = <T>(array: T[], predicate: (current: T[]) => boolean): T[] => {
  const result: T[] = [];

  for (let index = 0; index < array.length; index += 1) {
    result.push(array[index]);

    if (!predicate(result)) {
      result.pop();
      break;
    }
  }

  return result;
};

export const distinct = <T>(...items: T[]): T[] =>
  items.filter((value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  });
