export const swap = <K, V>(map: Map<K, V>): Map<V, K> => {
  return new Map<V, K>([...map.entries()].map((value: [K, V]) => [value[1], value[0]]));
};
