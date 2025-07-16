function mergeIntervals(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  };

  let sortedInterval = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [[...sortedInterval[0]]];

  for (let i = 1; i < sortedInterval.length; i++) {
    let curInt = sortedInterval[i];
    let [curStart, curEnd] = curInt;

    let lastInt = result[result.length - 1];
    let [lastStart, lastEnd] = lastInt;

    if (lastEnd >= curEnd) {
      continue;
    } else if (lastEnd < curStart) {
      result.push([...curInt]);
    } else {
      lastInt[1] = curEnd;
    };
  };

  return result;
}

const array1 = [[15, 18], [1, 3], [2, 6], [8, 10]];
console.log(mergeIntervals(array1)); // [[1, 6], [8, 10], [15, 18]]

const array2 = [[1, 4], [4, 5]];
console.log(mergeIntervals(array2)); // [[1, 5]]

const array3 = [[11, 12], [2, 3], [5, 7], [1, 4], [8, 10], [6, 8]];
console.log(mergeIntervals(array3)); // [[1, 4], [5, 10], [11, 12]]

const array4 = [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]];
console.log(mergeIntervals(array4)); // [[1, 2]]
