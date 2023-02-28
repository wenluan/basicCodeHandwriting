// 2个栈实现队列，并且实现入队和出队
export class Queue {
  private mainStack = [];
  private popStack = [];

  // 入队
  public in(item: number): void {
    this.mainStack.push(item);
  }

  // 出队
  public out(): number | null {
    if (!this.mainStack.length && !this.popStack.length) {
      return null;
    }
    if (!!this.popStack.length) {
      return this.popStack.pop();
    }
    const length = this.mainStack.length;
    for (let i = 0; i < length; i ++) {
      this.popStack.push(this.mainStack.pop());
    }
    return this.popStack.pop();
  }
}

const queue = new Queue();
queue.in(1);
queue.in(2);
queue.in(3);
console.log(queue.out());
console.log(queue.out());
queue.in(4);
console.log(queue.out());
console.log(queue.out());