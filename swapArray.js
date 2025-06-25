// 1
let array_1 = ['a', 'b', 'c'];

[array_1[1], array_1[2]] = [array_1[2], array_1[1]];

console.log(array_1);

// 2
let array_2 = ['a', 'b', 'c'];

let temp = array_2[1];
array_2[1] = array_2[2];
array_2[2] = temp;

console.log(array_2);

// 3
let array_3 = ['a', 'b', 'c'];

Array.prototype.swap = function (index1, index2) {
  [this[index1], this[index2]] = [this[index2], this[index1]];
};

array_3.swap(1,2);
console.log(array_3);
