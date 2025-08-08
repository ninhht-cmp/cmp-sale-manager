export const isNullOrUndefined = (param: unknown): boolean =>
  typeof param === 'undefined' || param === null;
