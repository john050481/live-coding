function defaultHashArgsFunc(args) {
  return args.join();
};

export function cachingDecorator(func, hash = defaultHashArgsFunc) {
  const cache = new Map();

  return function funcWithCache(...args) {
    const key = hash(args);

    if (cache.has(key)) {
      const cachedValue = cache.get(key);
      // console.log(`IN cache: '${key}' => ${cachedValue}`);
      return cachedValue;
    };

    const result = func.apply(this, args);
    cache.set(key, result);

    // console.log(`NO cache: '${key}' => ${result}`);
    return result;
  };
};

//-----------------TEST-----------------
const sum = (x, y) => x + y;
const cachedSum = cachingDecorator(sum);

console.log(cachedSum(2, 2)); // no cache
console.log(cachedSum(2, 2)); // in cache

console.log(cachedSum(2, 3)); // no cache
console.log(cachedSum(2, 3)); // in cache
