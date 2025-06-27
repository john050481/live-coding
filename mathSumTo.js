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

let COUNT = 10_000_000;
let start = 0;
let N = 20;

start = Date.now();
for (i=1; i<=COUNT; i++) sumToRecurs(N);
console.log('sumToRecurs time (MS) = ', Date.now() - start);

start = Date.now();
for (i=1; i<=COUNT; i++) sumToCycle(N);
console.log('sumToCycle time (MS) = ', Date.now() - start);

start = Date.now();
for (i=1; i<=COUNT; i++) sumToProgression(N);
console.log('sumToProgression time (MS) = ', Date.now() - start);
