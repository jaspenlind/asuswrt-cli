export const any = <T>(array: ArrayLike<T>) => array.length > 0;

export const isEmpty = <T>(array: ArrayLike<T>) => !any(array);

export const last = <T>(array: ArrayLike<T>): T => array[array.length - 1];

export const distinct = <T>(...items: T[]): T[] =>
  items.filter((value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  });
