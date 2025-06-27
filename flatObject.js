const flatObject = { 'a.b.c': 1, 'a.b.d': 2, 'a.e': 3, 'f': 4 };

const flat = (obj) => {
  const newObj = {};

  const keysFlat = Object.keys(obj); // ['a.b.c', 'a.b.d' ...]

  for (let keyFlat of keysFlat) {
    let pointerObj = newObj;

    const keys = keyFlat.split('.'); // ['a', 'b', 'c'] ... ['a', 'b', 'd'] ...

    for (let i=0; i<keys.length; i++) {
      const key = keys[i];
      const isLast = i === keys.length - 1;
      const isOwnProp = pointerObj.hasOwnProperty(key);

      if (!isOwnProp) pointerObj[key] = isLast ? obj[keyFlat] : {};

      pointerObj = pointerObj[key];
    };
  };

  return newObj;
};

console.log('newObj = ', flat(flatObject));

