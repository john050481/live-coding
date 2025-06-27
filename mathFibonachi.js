import { performance } from './__performance__.js';
import { makeCachingForOneArg } from './cacheDecoratorForOneArg.js';

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
const COUNT = 10_000_000;
const N = 10;

performance('fibRecurs', () => fibRecurs(N), COUNT);

const fibRecursWithCache = makeCachingForOneArg(fibRecurs);
performance('fibRecurs', () => fibRecursWithCache(N), COUNT, 'with cache');

performance('fibCycle', () => fibCycle(N), COUNT);

const fibCycleWithCache = makeCachingForOneArg(fibCycle);
performance('fibCycle', () => fibCycleWithCache(N), COUNT, 'with cache');
