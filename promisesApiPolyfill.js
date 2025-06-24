const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let resCount = 0;

    promises.forEach((promise, i) => {
      Promise.resolve(promise)
      .then(res => {
        resCount++;
        result[i] = res;

        if (resCount === promises.length) resolve(result);
      })
      .catch(err => reject(err));
    });
  });
};


const promiseAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let resCount = 0;

    promises.forEach((promise, i) => {
      Promise.resolve(promise)
      .then(res => {
        resCount++;
        result[i] = {status: 'fulfilled', value: res};
      })
      .catch(err => {
        resCount++;
        result[i] = {status: 'rejected', reason: err};
      })
      .finally(() => {
        if (resCount === promises.length) resolve(result);
      });
    });
  });
};



const promiseAny = (promises) => {
  const result = [];
  let resCount = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resCount++;
        result[i] = err;
      })
      .finally(() => {
        if (resCount === promises.length) reject(result);
      });
    });
  });
};

const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        resolve(e);
      });
    });
  });
};

//-------------------TEST---------------
const DIFF = 0.5;

const promisesTest = [
  // 1, // пример, что в промис можно просто значение прокинуть
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > DIFF
        ? resolve("500")
        : reject(new Error('500'));
    }, 500);
  }),

  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > DIFF
        ? resolve("1000")
        : reject(new Error('1000'));
    }, 1000);
  }),

  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > DIFF
        ? resolve("1500")
        : reject(new Error('1500'));
    }, 1500);
  }),
];

promiseAll(promisesTest)
  .then((res) => console.log("ALL RESOLVED: ", res))
  .catch((err) => console.log("ALL REJECTED: ", err));
Promise.all(promisesTest)
  .then((res) => console.log("ALL_ORIG RESOLVED: ", res))
  .catch((err) => console.log("ALL_ORIG REJECTED: ", err));

promiseAllSettled(promisesTest)
  .then((res) => console.log("SETTLED RESOLVED: ", res))
  .catch((err) => console.log("SETTLED REJECTED: ", err));
Promise.allSettled(promisesTest)
  .then((res) => console.log("SETTLED_ORIG RESOLVED: ", res))
  .catch((err) => console.log("SETTLED_ORIG REJECTED: ", err));

promiseRace(promisesTest)
  .then((res) => console.log("RACE RESOLVED: ", res))
  .catch((err) => console.log("RACE REJECTED: ", err));
Promise.race(promisesTest)
  .then((res) => console.log("RACE_ORIG RESOLVED: ", res))
  .catch((err) => console.log("RACE_ORIG REJECTED: ", err));

promiseAny(promisesTest)
  .then((res) => console.log("ANY RESOLVED: ", res))
  .catch((err) => console.log("ANY REJECTED: ", err));
Promise.any(promisesTest)
  .then((res) => console.log("ANY_ORIG RESOLVED: ", res))
  .catch((err) => console.log("ANY_ORIG REJECTED: ", err));
