function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, [...args, ...args2]);
      }
    }
  };
}

function sum(a, b, c) {
  console.log('this = ', this);
  return a + b + c;
}

let curriedSum = curry(sum);
let obj = {
  a: 1,
  curriedSum,
}

console.log( obj.curriedSum(1, 2, 3) ); // 6, this = obj
console.log( obj.curriedSum(1)(2,3) ); // 6, this = global(или undefined - зависит от 'use strict')
console.log( obj.curriedSum(1)(2)(3) ); // 6, this = global(или undefined - зависит от 'use strict')