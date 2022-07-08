export interface ParseResult<T> {
  hasValue: boolean;
  value?: T;
}

export const empty = <T,>(): ParseResult<T> => ({ hasValue: false });

export const create = <T,>(value?: T): ParseResult<T> => ({
  value,
  hasValue: value !== undefined
});
