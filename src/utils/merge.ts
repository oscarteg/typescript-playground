type Primitive = null | undefined | string | number | boolean | symbol | bigint;

function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === "object" && item !== null && !Array.isArray(item);
}

export function deepMerge<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
>(target: T, source: U): T & U {
  const output = { ...target } as T & U;

  for (const key in source) {
    const sourceValue = source[key];

    if (isObject(sourceValue)) {
      const targetValue = (target as Record<string, unknown>)[key];

      if (isObject(targetValue)) {
        (output as Record<string, unknown>)[key] = deepMerge(
          targetValue,
          sourceValue
        );
      } else {
        (output as Record<string, unknown>)[key] = sourceValue;
      }
    } else {
      (output as Record<string, unknown>)[key] = sourceValue;
    }
  }

  return output;
}
