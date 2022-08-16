/** 手写 bind */
(Function.prototype as any).newBind = function() {
  const args = [...arguments];
  const newThis = args.shift();
  const self = this;
  return function() {
    return self.apply(newThis, args);
  }
}

function sayName(hello: string, name: string) {
  console.log(`${hello}, ${name} ${this.name}`);
}

const obj = {
  name: 'Bob',
};

(sayName as any).newBind(obj, 'hello', 'Mary')();
