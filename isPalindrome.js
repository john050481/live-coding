function isPalindromeSimple(str) {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
};

// --------------

const isChar = char => char.toUpperCase() !== char.toLowerCase();

const NUMBER_STR = ['0','1','2','3','4','5','6','7','8','9'];
const isNumber = char => NUMBER_STR.includes(char);

function isPalindromeOnlyCharAndDigit(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    let leftChar = str[left];
    let rightChar = str[right];

    let isValidLeft = isChar(leftChar) || isNumber(leftChar);
    if (!isValidLeft) {
      left++;
      continue;
    };

    let isValidRight = isChar(rightChar) || isNumber(rightChar);
    if (!isValidRight) {
      right--;
      continue;
    };

    if (leftChar.toLowerCase() !== rightChar.toLowerCase()) {
      return false;
    }

    left++;
    right--;
  };

  return true;
};
// Примеры использования:
console.log(isPalindromeOnlyCharAndDigit('123     L evEl    $321')); // true
console.log(isPalindromeOnlyCharAndDigit('racecar')); // true
console.log(isPalindromeOnlyCharAndDigit('hello')); // false
console.log(isPalindromeOnlyCharAndDigit('!@#$%     l    v l     $%')); // true
console.log(isPalindromeOnlyCharAndDigit('')); // true
