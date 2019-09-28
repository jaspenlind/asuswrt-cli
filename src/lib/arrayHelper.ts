export const any = (array: ArrayLike<any>) => array.length > 0;

export const isEmpty = (array: ArrayLike<any>) => !any(array);

export const last = <T>(array: ArrayLike<T>): T => array[array.length - 1];
