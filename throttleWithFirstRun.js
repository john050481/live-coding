function debounce(f, ms) {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => f.apply(this, args), ms);
  };
};

function throttle(f, ms, isFirstRun) {
  let isThrottled = false;
  let lastArgs = null;
  let lastThis = null;

  let isFirstRunLaunched = false;
  let resetFirstRunDebounce = debounce(() => {
    isFirstRunLaunched = false;
    console.log('reset isFirstRunLaunched = ', isFirstRunLaunched);
  }, ms);

  return function(...args) {
    lastArgs = args;
    lastThis = this;
    isFirstRun && isFirstRunLaunched && resetFirstRunDebounce();

    if (isThrottled) {
      return;
    };

    isThrottled = true;
    if (isFirstRun && !isFirstRunLaunched) {
      f.apply(lastThis, lastArgs);
      isFirstRunLaunched = true;
      console.log('isFirstRunLaunched = ', isFirstRunLaunched);
    };

    setTimeout(() => {
      f.apply(lastThis, lastArgs);
      isThrottled = false;
      lastArgs = null;
      lastThis = null;
    }, ms);
  };
}

function f(text, ms) {
  console.log(text, ms, ', this = ', this);
};

let obj = {
  a: 1,
  tF: throttle(f, 1000, true),
  dF: debounce(f, 1000),
}

setTimeout(() => obj.tF('tF', 0), 0);
setTimeout(() => obj.tF('tF', 400), 400);
setTimeout(() => obj.tF('tF', 800), 800);
setTimeout(() => obj.tF('tF', 1200), 1200);
setTimeout(() => obj.tF('tF', 1600), 1600);
setTimeout(() => obj.tF('tF', 2000), 2000);
setTimeout(() => obj.tF('tF', 2400), 2400);
setTimeout(() => obj.tF('tF', 2800), 2800);
setTimeout(() => obj.tF('tF', 3200), 3200);
setTimeout(() => obj.tF('tF', 3600), 3600);

// // test on browser
// let start = Date.now();

// let obj2 = {
//   e: 1,
//   tF: throttle(
//     function(e) {console.log('throttle:', 'x = ', e.clientX, ', diff = ', Date.now() - start, ', this = ', this)},
//     1000,
//     true
//   ),
//   dF: debounce(
//     function(e) {console.log('debounce:', 'x = ', e.clientX, ', diff = ', Date.now() - start, ', this = ', this)},
//     1000
//   ),
// };

// document.body.addEventListener('mousemove', e => obj2.tF(e));

// document.body.addEventListener('mousemove', e => obj2.dF(e));
