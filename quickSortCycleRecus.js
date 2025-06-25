const arr = [9,8,7,6,5,4,1,2,3,11,55,99,1,4,5,9,999,888,777,666,555,444,5,2,1,55,77,66,33,22,55,1,4,7,8,9,0,9,11,55,99,88,22,77,66,8,7,6,5,4,1,2,3,11,55,99,1,4,5,9,999,5,2,1,55,77,66,33,22,55,1,4,7,8,9,0];
console.log('arr = ', arr);

console.log('-------------------с помощью рекурсии--------------------------------');
let count = 0;
function quickSort(array) {
    if (array.length <= 1) {
        return array
    }
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array[pivotIndex]
    let less = []
    let greater = []
    for (let i = 0; i < array.length; i++) {
        count += 1
        if(i === pivotIndex)
            continue
        if (array[i] < pivot) {
            less.push(array[i])
        } else {
            greater.push(array[i])
        }
    }
    return [...quickSort(less), pivot, ...quickSort(greater)]
}

console.log('quickSort: result = ',quickSort(arr))
console.log('quickSort: count = ', count)

console.log('-------------------с помощью цикла--------------------------------');
count = 0
function quickSortCycle(array) {
    if (array.length <= 1) {
        return array
    }

    let stack = [array];
    let result = [];

    while (stack.length) {
        let curArr = stack.pop();

        if (curArr.length === 1) {
            result.push(...curArr);
            continue;
        };


        let pivotIndex = Math.floor(curArr.length / 2);
        let pivot = curArr[pivotIndex]
        let less = []
        let greater = []

        for (let i = 0; i < curArr.length; i++) {
            count += 1
            if(i === pivotIndex)
                continue;
            if (curArr[i] < pivot) {
                less.push(curArr[i])
            } else {
                greater.push(curArr[i])
            }
        }

        less.length && stack.push(less);
        stack.push([pivot]);
        greater.length && stack.push(greater);
        // stack = [array] -> [less , [pivot], greater] -> [less , [pivot], lessNext, [pivotNext], greaterNext]
    };

    return result.reverse(); // result = [9,8,7 ... 1] - нужен реверс
}

console.log('quickSortCycle: result = ', quickSortCycle(arr))
console.log('quickSortCycle: count = ', count)

console.log('-------------------замер производительности--------------------------------');

let COUNT = 1_000_000;
let start = 0;
let end = 0;

start = Date.now();
for (i=1; i<=COUNT; i++) {
  quickSort(arr);
};
console.log('quickSort time (MS) = ', Date.now() - start);

start = Date.now();
for (i=1; i<=COUNT; i++) {
  quickSortCycle(arr);
};
console.log('quickSortCycle time (MS) = ', Date.now() - start);
