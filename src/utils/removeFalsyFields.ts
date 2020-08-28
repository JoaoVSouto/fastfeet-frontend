export function removeFalsyFields<T>(object: T): Partial<T> {
  const objectWithoutFalsyFields = Object.fromEntries(
    Object.entries(object).filter(entry => Boolean(entry[1]))
  ) as Partial<T>;

  return objectWithoutFalsyFields;
}
