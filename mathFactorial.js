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

let COUNT = 10_000_000;
let start = 0;
let N = 10;

start = Date.now();
for (i=1; i<=COUNT; i++) factorial(N);
console.log('factorial time (MS) = ', Date.now() - start);

start = Date.now();
for (i=1; i<=COUNT; i++) factorialCycle(N);
console.log('factorialCycle time (MS) = ', Date.now() - start);
