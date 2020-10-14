export function noop() {
  return undefined;
}

export function deleteNil(object: Record<string, unknown>) {
  return Object.entries(object).reduce(
    (result: Record<string, unknown>, [key, value]) => {
      if (value != null) {
        result[key] = value;
      }
      return result;
    },
    {}
  );
}
