/** 手写 new */
function myNew(constructor: Function, ...args: any) {
  if (typeof constructor !== 'function') {
    throw new Error('Constructor is not a function!');
  }
  // 创建空对象
  const obj = {};
  // 设置对象的原型
  (obj as any).__proto__ = constructor.prototype;
  // 执行构造函数，获得内部属性
  const res = constructor.apply(obj, args);
  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';

  return isObject || isFunction ? res : obj;
}

function Person() {
  this.name = 'Bob';
  this.sayHello = () => {
    console.log(`hello, ${this.name}`);
  }
}

const p = myNew(Person);
p.sayHello();
p.name = 'Ben';
p.sayHello();
