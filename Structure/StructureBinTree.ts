import { Maybe } from './types';

class BinTree<T> {
  head: Maybe<BinTreeNode<T>>;
  size: number;

  constructor () {
    this.head = null;
    this.size = 0;
  }

  add(value: T) {
    const newNode = new BinTreeNode(value);

    if (!this.head) {
      this.head = newNode;
      this.size++;
    } else {
      let curNode = this.head;
      while (!!curNode) {
        if (newNode.value === curNode.value) {
          break;
        };

        if (newNode.value > curNode.value) {
          if (curNode.right) {
            curNode = curNode.right;
            continue;
          } else {
            curNode.right = newNode;
            this.size++;
            break;
          };
        } else {
          if (curNode.left) {
            curNode = curNode.left;
            continue;
          } else {
            curNode.left = newNode;
            this.size++;
            break;
          };
        };
      };
    };

    return this;
  }
}

class BinTreeNode<T> {
  value: T;
  left: Maybe<BinTreeNode<T>>;
  right: Maybe<BinTreeNode<T>>;

  constructor(value: T) {
    this.value = value;
  }
};

let binTree = new BinTree<number>();
binTree.add(7).add(4).add(5).add(6).add(2).add(1).add(2);
binTree.add(10).add(11).add(9).add(8).add(11);

console.log('StructureDataBinTree tree = ', binTree);
