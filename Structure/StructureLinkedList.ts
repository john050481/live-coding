// LinkedList
// [HEAD] ===>>>   [LinkedListNode] <-> [LinkedListNode] <-> [LinkedListNode] <-> [LinkedListNode]   <<<=== [LAST]
// SIZE = 4

import { Maybe } from "./types";

export class LinkedList<T> {
  head: Maybe<LinkedListNode<T>>;
  last: Maybe<LinkedListNode<T>>;
  size: number;

  constructor() {
    this.head = null;
    this.last = null;
    this.size = 0;
  }

  push(value: T) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.last = newNode;
    } else {
      newNode.prev = this.last;
      this.last!.next = newNode;
      this.last = newNode;
    };
    this.size++;
    return this;
  }
  pop() {
    if (!this.head) {
      return this;
    } else if (this.size === 1) {
      this.head = null;
      this.last = null;
    } else {
      const prevLastNode = this.last!.prev;
      prevLastNode!.next = null;
      this.last = prevLastNode;
    };
    this.size--;
    return this;
  }

  unshift(value: T) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.head;
      this.head!.prev = newNode;
      this.head = newNode;
    };
    this.size++;
    return this;
  }
  shift() {
    if (!this.head) {
      return this;
    } else if (this.size === 1) {
      this.head = null;
      this.last = null;
    } else {
      const nextAfterHeadNode = this.head!.next;
      nextAfterHeadNode!.prev = null;
      this.head = nextAfterHeadNode;
    };
    this.size--;
    return this;
  }

  getFromStartToEnd(): T[] {
    const result: T[] = [];
    let node = this.head;
    while (!!node) {
      result.push(node.value);
      node = node.next;
    };
    return result;
  };
  getFromEndToStart(): T[] {
    const result: T[] = [];
    let node = this.last;
    while (!!node) {
      result.push(node.value);
      node = node.prev;
    };
    return result;
  };
};
class LinkedListNode<T> {
  value: T;
  next: Maybe<LinkedListNode<T>>;
  prev: Maybe<LinkedListNode<T>>;

  constructor(value: T, next?: LinkedListNode<T>, prev?: LinkedListNode<T>) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }

  print() {
    return this.value;
  }
};

const list = new LinkedList<string>();
list.unshift('3').unshift('2').unshift('1').push('4').push('5').push('6');
console.log('StructureDataLinkedList = ', list);
console.log('StructureDataLinkedList getFromStartToEnd = ', list.getFromStartToEnd());
console.log('StructureDataLinkedList getFromEndToStart = ', list.getFromEndToStart());
