import { performance } from './__performance__.js';

//--------------------recurs--------------------
function flattenArray(arr, dep = 1) {
  if (dep < 1) return arr;

  let resultArr = [];
  for (let i=0; i< arr.length; i++) {
    if (Array.isArray(arr[i])) {
      resultArr.push(...flattenArray(arr[i], dep-1));
    } else {
      resultArr.push(arr[i]);
    };
  };
  return resultArr;
}

// Пример использования
const nestedArray = [0, [1, [2, [3, [4, [5, [6, [7]]]]]]]];
console.log(flattenArray(nestedArray, 1));
console.log(flattenArray(nestedArray, 2));
console.log(flattenArray(nestedArray, 3));
console.log(flattenArray(nestedArray, 4));
console.log(flattenArray(nestedArray, 5));
console.log(flattenArray(nestedArray, 6));
console.log(flattenArray(nestedArray, 7));

//--------------------cycle--------------------
function flattenArrayCycle(arr, dep = 1) {
  if (dep < 1) return arr;

  let curDep = dep;
  let resultArr = [...arr];
  let isThereAreStillArrays = true; // флаг который говорит есть ли еще вложенные массивы (если их нет, то продолжать разворачивать дальше бесполезно)

  do {
    isThereAreStillArrays = false;
    let tempArr = resultArr;
    resultArr = [];

    for (let i = 0; i < tempArr.length; i++) {
      const elem = tempArr[i];

      if (Array.isArray(elem)) {
        isThereAreStillArrays = true;
        resultArr.push(...elem);
      } else {
        resultArr.push(elem);
      };
    }
  } while (--curDep && isThereAreStillArrays)
  return resultArr;
}

// Пример использования
const nestedArray2 = [0, [1, [2, [3, [4, [5, [6, [7]]]]]]]];
console.log(flattenArrayCycle(nestedArray2, 1));
console.log(flattenArrayCycle(nestedArray2, 2));
console.log(flattenArrayCycle(nestedArray2, 3));
console.log(flattenArrayCycle(nestedArray2, 4));
console.log(flattenArrayCycle(nestedArray2, 5));
console.log(flattenArrayCycle(nestedArray2, 6));
console.log(flattenArrayCycle(nestedArray2, 7));

console.log('-------------------замер производительности--------------------------------');
let COUNT = 1_000_000;
let nestedArray3 = [0, [1, [2, [3, [4, [5, [6, [7]]]]]]]];

performance('flattenArray', () => flattenArray(nestedArray3, 77), COUNT);

performance('flattenArrayCycle', () => flattenArrayCycle(nestedArray3, 77), COUNT);
