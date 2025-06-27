// Фибоначчи определяется формулой Fn = Fn-1 + Fn-2
// 1, 1, 2, 3, 5, 8, 13
function fibRecurs(n) {
  return n <= 1 ? n : fibRecurs(n - 1) + fibRecurs(n - 2);
};

console.log( fibRecurs(3) ); // 2
console.log( fibRecurs(7) ); // 13
console.log( fibRecurs(40) ); // 102334155

//-----------------cycle---------------

function fibCycle(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
};

console.log( fibCycle(3) ); // 2
console.log( fibCycle(7) ); // 13
console.log( fibCycle(40) ); // 102334155

console.log('-------------------замер производительности--------------------------------');
function makeFibCaching(f) {
  const cache = {};

  return function funcWithCache(x) {
    if (!(x in cache)) {
      cache[x] = f.call(this, x);
    }
    return cache[x];
  };
};

let COUNT = 10_000_000;
let start = 0;
let N = 10;

start = Date.now();
for (i=1; i<=COUNT; i++) fibRecurs(N);
console.log('fibRecurs time (MS) = ', Date.now() - start);

start = Date.now();
let fibRecursWithCache = makeFibCaching(fibRecurs);
for (i=1; i<=COUNT; i++) fibRecursWithCache(N);
console.log('fibRecurs with cache time (MS) = ', Date.now() - start);

start = Date.now();
for (i=1; i<=COUNT; i++) fibCycle(N);
console.log('fibCycle time (MS) = ', Date.now() - start);

start = Date.now();
let fibCycleWithCache = makeFibCaching(fibCycle);
for (i=1; i<=COUNT; i++) fibCycleWithCache(N);
console.log('fibCycle with cache time (MS) = ', Date.now() - start);
