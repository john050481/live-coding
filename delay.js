'use strict'

function delayMacro(f, ms) {
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

function delayMicro(f, ms) {
  return function(...args) {
    return new Promise(resolve => setTimeout(() => {
      resolve(f.apply(this, args));
    }, ms));
  };
};

function delaySync(f, ms) {
  return function(...args) {
    const start = Date.now();
    while (start + ms > Date.now()) {};
    return f.apply(this, args);
  };
};

//------------------------TEST-------------------------
function sum(a, b) {
  const res = a + b;
  console.log( res, 'this = ', this );
  return res;
}

delayMacro(sum, 1000)(1, 2);
// delayMicro(sum, 1000)(1, 2).then(res => console.log('RES = ', res));
// console.log('RES = ', delaySync(sum, 1000)(1, 2));

const objA = {
  a: 1,
  delayMacro: delayMacro(sum, 1500),
  delaySync: delaySync(sum, 1500),
  delayMicro: delayMicro(sum, 1500),
};
objA.delayMacro(3, 4);
// objA.delayMicro(3, 4).then(res => console.log('RES = ', res));
// console.log('RES = ', objA.delaySync(3, 4));
