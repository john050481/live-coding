import { performance } from './__performance__.js';
import { makeCachingForOneArg } from './cacheDecoratorForOneArg.js';

// sumTo(n) = 1 + 2 + ... + n
// sumTo(4) = 4 + 3 + 2 + 1 = 10
// sumTo(n) = n + sumTo(n-1) for n > 1.

//------------------------- Recurs
function sumToRecurs(n) {
  if (n == 1) return 1;
  return n + sumToRecurs(n - 1);
};
console.log(sumToRecurs(100)); // 5050

//------------------------- Cycle

function sumToCycle(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
console.log(sumToCycle(100)); // 5050

//------------------------ Arithmetic (difference) progression: sumTo(n) = n*(n+1)/2:
function sumToProgression(n) {
  return n * (n + 1) / 2;
};
console.log( sumToProgression(100) ); // 5050

console.log('-------------------замер производительности--------------------------------');

const COUNT = 10_000_000;
const N = 20;

performance('sumToRecurs', () => sumToRecurs(N), COUNT);

const cachedSumToRecurs = makeCachingForOneArg(sumToRecurs);
performance('sumToRecurs with cache', () => cachedSumToRecurs(N), COUNT);

performance('sumToCycle', () => sumToCycle(N), COUNT);

const cachedSumToCycle = makeCachingForOneArg(sumToCycle);
performance('sumToCycle with cache', () => cachedSumToCycle(N), COUNT);

performance('sumToProgression', () => sumToProgression(N), COUNT);
