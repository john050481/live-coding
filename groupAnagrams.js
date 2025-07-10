var groupAnagrams = function(arrStrings) {
  let res = {};

  for (let str of arrStrings) {
    let sortedStr = str.toLowerCase().split('').sort().join('');

    if (res.hasOwnProperty(sortedStr)) {
      res[sortedStr].push(str);
    } else {
      res[sortedStr] = [str];
    };
  }
  return Object.values(res);
};

const arr = ['Eat','Tea','tan','ate','nat','bat','','','1234','1243','3412','3421','2314','zxcv', 'vcxz', 'zcvx', 'zvxc', 'zxvc'];
const res = groupAnagrams(arr);
console.log(res);
