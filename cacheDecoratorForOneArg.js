export function makeCachingForOneArg(f) {
  const cache = {};

  return function funcWithCache(x) {
    if (!(x in cache)) {
      cache[x] = f.call(this, x);
    }
    return cache[x];
  };
};
