const isDeepEqual = (a, b) => {
  if (a === b) return true;

  if ( (typeof a === 'object' && a !== null) && (typeof b === 'object' && b !== null) ) {
    if ( Object.keys(a).length !== Object.keys(b).length ) {
      return false;
    };

    for (let prop in a) {
      if (!a.hasOwnProperty(prop)) continue;

      if (!isDeepEqual(a[prop], b[prop])) return false;
    };

    return true;
  };

  return false;
};

// -----------TEST----------
let obj1;
let obj2;

obj1 = {a: 'a'};
obj2 = {a: 'b'};
console.log(isDeepEqual(obj1, obj2)); // false

obj1 = [1, 2];
obj2 = [1, 3];
console.log(isDeepEqual(obj1, obj2)); // false

obj1 = {a: {aa: 'aa'}, b: 1, c: [2, {cc: 'cc'}, [3]]};
obj2 = {a: {aa: 'aa'}, b: 1, c: [2, {cc: 'cc'}, [3]]};
console.log(isDeepEqual(obj1, obj2)); // true

obj1 = [1, '2', {z: 3}, [4]];
obj2 = [1, '2', {z: 3}, [4]];
console.log(isDeepEqual(obj1, obj2)); // true
