const compose = (...functions) => {
  return (input) => {
    return functions.reduceRight((acc, fn) => {
      return fn(acc);
    }, input);
  };
};

const pipe = (...functions) => {
  return (input) => {
    return functions.reduce((acc, fn) => {
      return fn(acc);
    }, input);
  };
};

const add5 = x => x + 5;
const multiplyBy3 = x => x * 3;
const subtract10 = x => x - 10;

const composedFunction = compose(subtract10, multiplyBy3, add5);
const pipedFunction = pipe(subtract10, multiplyBy3, add5);

console.log(composedFunction(7),', ', pipedFunction(7)); // 26, -4
