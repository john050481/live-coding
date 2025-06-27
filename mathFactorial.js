import { performance } from './__performance__.js';
import { makeCachingForOneArg } from './cacheDecoratorForOneArg.js';

// n! = n * (n - 1) * (n - 2) * ...*1
// n! = n * (n-1)! Например: 3! = 3*2! = 3*2*1! = 6

function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

console.log( factorial(5) ); // 120
console.log( factorial(10) ); // 3628800

//--------------------------- Cycle

function factorialCycle(n) {
  if (n===1) return 1;

  let res = 1;
  for (let i=1; i<=n; i++) {
    res *= i;
  };
  return res;
};

console.log( factorialCycle(5) ); // 120
console.log( factorialCycle(10) ); // 3628800

console.log('-------------------замер производительности--------------------------------');
const COUNT = 10_000_000;
const N = 10;

performance('factorial', () => factorial(N), COUNT);

const cachedFactorial = makeCachingForOneArg(factorial);
performance('factorial with cache', () => cachedFactorial(N), COUNT);

performance('factorialCycle', () => factorialCycle(N), COUNT);

const cachedFactorialCycle = makeCachingForOneArg(factorialCycle);
performance('factorialCycle with cache', () => cachedFactorialCycle(N), COUNT);
