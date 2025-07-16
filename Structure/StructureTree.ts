import { Maybe } from "./types";

class Tree<T> {
  head: Maybe<TreeNode<T>>;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  unshift(value: T | TreeNode<T>) {
    const newNode = value instanceof TreeNode ? value : new TreeNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = [this.head];
      this.head!.prev = newNode;
      this.head = newNode;
    };
    this.size++;
    return this;
  }

  find(node: TreeNode<T>) {
    if (!this.head) {
      return false;
    };

    let queue = [this.head];
    while (queue.length) {
      const curNode = queue.pop();

      if (curNode === node) {
        return true;
      };

      queue = [ ...queue, ...(curNode?.next ? curNode.next : []) ]
    };

    return false;
  }

  add(parent: TreeNode<T>, node: TreeNode<T>) {
    if (!this.find(parent)) {
      return false;
    };

    parent.next?.push(node);
    node.prev = parent;

    this.size++;
    return true;
  }

  printStartToEnd(): T[] {
    if (!this.head) {
      return [];
    };

    let result: T[] = [];
    let queue = [this.head];
    while (queue.length) {
      const curNode = queue[0];
      queue.shift();

      result.push(curNode?.value);

      queue = [ ...queue, ...(curNode?.next ? curNode.next : []) ]
    };

    return result;
  }

  printEndToStart(): T[] {
    if (!this.head) {
      return [];
    };

    let result: T[] = [];
    let queue = [this.head];
    while (queue.length) {
      const curNode = queue[0];
      queue.shift();

      result.unshift(curNode?.value);

      queue = [ ...queue, ...(curNode?.next ? curNode.next : []) ]
    };

    return result;
  }
}

class TreeNode<T> {
  value: T;
  next: Maybe<TreeNode<T>[]>;
  prev: Maybe<TreeNode<T>>;

  constructor(value: T, next?: TreeNode<T>, prev?: TreeNode<T>) {
    this.value = value;
    this.next = next ? [next] : [];
    this.prev = prev;
  }

  getParentArr(): T[] {
    return [...(this.prev?.getParentArr() || []), this.value];
  }

  print() {
    return this.value;
  }
};

// Tree
/*
                                        A
                                        |
                             ___________B___________
                            /           |           \
                         __C__         _D_           E
                        /  |  \       /   \          |
                       F   G   H   __I__   J         K
                                  /  |  \
                                 L   M   N
*/

let tree = new Tree<string>();

const nodeB = new TreeNode('B');
tree.unshift(nodeB);

tree.unshift('A');
const nodeA = tree.head;
console.log('StructureDataTree A0 = ', nodeA);

// node B child
const nodeC = new TreeNode('C');
tree.add(nodeB, nodeC);
const nodeD = new TreeNode('D');
tree.add(nodeB, nodeD);
const nodeE = new TreeNode('E');
tree.add(nodeB, nodeE);

// node C child
const nodeF = new TreeNode('F');
tree.add(nodeC, nodeF);
const nodeG = new TreeNode('G');
tree.add(nodeC, nodeG);
const nodeH = new TreeNode('H');
tree.add(nodeC, nodeH);

// node D child
const nodeI = new TreeNode('I');
tree.add(nodeD, nodeI);
const nodeJ = new TreeNode('J');
tree.add(nodeD, nodeJ);

// node E child
const nodeK = new TreeNode('K');
tree.add(nodeE, nodeK);

// node I child
const nodeL = new TreeNode('L');
tree.add(nodeI, nodeL);
const nodeM = new TreeNode('M');
tree.add(nodeI, nodeM);
const nodeN = new TreeNode('N');
tree.add(nodeI, nodeN);

console.log('StructureDataTree tree = ', tree.size, tree);
console.log('StructureDataTree nodeM.getParentArr = ', nodeM.getParentArr());
console.log('StructureDataTree tree.print = ', tree.printStartToEnd());
console.log('StructureDataTree tree.print2 = ', tree.printEndToStart());
