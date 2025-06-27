let closeToOpenMap = {
  ')': '(',
  ']': '[',
  '}': '{',
};

let openToCloseMap = {
  '(': ')',
  '[': ']',
  '{': '}',
};

let validBraces = (str) => {
  let stack = [];

  for (let i=0; i<str.length; i++) {
    let curChar = str[i];

    let isOpen = !!openToCloseMap[curChar];
    if (isOpen) {
      stack.push(curChar);
      continue;
    };


    let isClose = !!closeToOpenMap[curChar];
    if (isClose) {
      let prevChar = stack.pop();
      let openBracesForCloseBraces = closeToOpenMap[curChar];

      if (openBracesForCloseBraces !== prevChar) {
        return false;
      };
    };
  };

  if (stack.length) {
    return false;
  }
  return true
};

console.log(validBraces('(}')); // false
console.log(validBraces(' a ( b ) [ c ] d d d { e } f f f ')); // true
console.log(validBraces('([]{})')); // true

console.log(validBraces('([(()()())])}')); // false
console.log(validBraces('([(()()())])')); // true
console.log(validBraces('  123  (- - -  [  - 4  { -- --  }  6 -  ]  - - )    -   789  ')); // true
