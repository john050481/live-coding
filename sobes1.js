const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 *  this.radius
};

console.log(shape.diameter()); // 20
console.log(shape.perimeter()) // NaN
//------------------------------------------------------------
function* generator(i) {
  yield i;
  yield i * 2;
}
const gen = generator(10);
console.log(gen.next().value); // 10
console.log(gen.next().value); // 20
//------------------------------------------------------------
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');

/* Console:
  script start
  script end
  promise1
  promise2
  setTimeout
*/
//------------------------------------------------------------
function task1(callback) {
  return new Promise((resolve) => {
    console.log('task1 start');
    setTimeout(() => {
      console.log('task1 done');
      resolve('resolve task1');
      callback();
    }, 3000);
  });
}

function task2(callback) {
  callback();
  return new Promise((resolve) => {
    console.log('task2 start');
    setTimeout(() => {
      console.log('task2 done');
      resolve('resolve task2');
    }, 2000);
  });
}
function task3() {
  console.log('task3 start');
  console.log('task3 done');
}

async function runTasks() {
  await task1(async () => {
    await task2(task3);
  });
}
runTasks();
/* Console:
  task1 start
  task1 done
  task3 start
  task3 done
  task2 start
  task2 done
*/
//------------------------------------------------------------
const add = () => {
  const cache = {};
  return num => {
    if(num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated ${result}`;
    }
  };
};
const addFunction = add();
console.log(addFunction(10)); // `Calculated ${100}`;
console.log(addFunction(10)); // `From cache! ${100]}`;
console.log(addFunction(10)); // `From cache! ${100}`;
//------------------------------------------------------------
class Foo {
  id;
  constructor() {
    this.id = 'foo';
    this.print();
  }

  print() {
    console.log('foo ' + this.id);
  }
}

class Bar extends Foo {
  constructor() {
    super();
    this.id = 'bar';
    this.print();
    super.print();
  }
  print() {
    console.log('bar ' + this.id)
  }
}

new Bar();
/* Console:
  bar foo
  bar bar
  foo bar
*/
//------------------------------------------------------------
let charCount = (str) => {
  let result = '';
  let cur = {char: str[0], count: 0};

  for (let i = 0; i <= str.length; i++) {
    let char = str[i];

    if (char === cur.char) {
      cur.count = cur.count + 1;
    } else {
      result = result + (cur.char + (cur.count === 1 ? '' : String(cur.count)));
      cur = {char: char, count: 1}
    }
  };

  return result;
};

console.log(charCount('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDD')); // AV3B3V2XDHJF4D6HA4J3D2SLS3D2
console.log(charCount('ABCD')); // ABCD
//------------------------------------------------------------
// type Parameters1<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
// type T1 = Parameters1<(a: string, b: number) => string>

// type ReturnType1<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
// type T2 = ReturnType1<(a: string, b: number) => string>
