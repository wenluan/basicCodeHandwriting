/**
 * 深拷贝
 * 参考文章：https://juejin.cn/post/6844903929705136141
 */

/** 对象的类型 */
enum TargetType {
  Object = '[object Object]',
  Array = '[object Array]',
  Map = '[object Map]',
  Set = '[object Set]',
  Args = '[object Arguments]',

  Number = '[object Number]',
  String = '[object String]',
  Date = '[object Date]',
  Bool = '[object Boolean]',
  RegExp = '[object RegExp]',
  Error = '[object Error]',
  Symbol = '[object Symbol]'
}

/** 可迭代的对象的类型 */
const iterableType = [TargetType.Object, TargetType.Array, TargetType.Map, TargetType.Set, TargetType.Args];

/** 判断是否是引用类型 （function 除外） */
const isObject = <T>(target: T): boolean => {
  return target !== null && typeof target === 'object';
}

/** 获得对象的具体类型 */
const getTargetType = <T>(target: T): TargetType => {
  return Object.prototype.toString.call(target) as TargetType;
}

/** 是否是一个可迭代的对象 */
const isIterableType = (type: TargetType): boolean => {
  return iterableType.includes(type);
}

/** 拷贝 Symbol 类型 */
const cloneSymbol = (target: Symbol): Symbol => {
  return Object(Symbol.prototype.valueOf.call(target));
}

/** 拷贝正则 TODO: 有问题，待优化 */
const cloneRegExp = (target: RegExp): RegExp => {
  const result = new RegExp(target.source);
  result.lastIndex = target.lastIndex;
  return result;
}

/** 拷贝不可迭代的对象 */
const clonePlianObject = <T>(target: T, type: TargetType): T => {
  const TargetConstructor = (target as Object).constructor;
  switch (type) {
    case TargetType.Number:
    case TargetType.String:
    case TargetType.Bool:
    case TargetType.Date:
    case TargetType.Error:
      return new (TargetConstructor as any)(target);
    // Symbol 类型
    case TargetType.Symbol:
      return cloneSymbol(target as unknown as Symbol) as unknown as T;
    case TargetType.RegExp:
    // 正则
      return cloneRegExp(target as unknown as RegExp) as unknown as T;
    default:
      return new (TargetConstructor as any)(target);
  }
}

/** 初始化同类型对象，继承原型 */
const initTarget = <T>(target: T): T => {
  const TargetConstructor = (target as Object).constructor;
  return new (TargetConstructor as any)();
}

/** 深拷贝 Set */
const cloneSet = (target: Set<any>, cloneTarget: Set<any>, map: WeakMap<any, any>): void => {
  target.forEach((value: any) => {
    cloneTarget.add(clone(value, map));
  });
}

/** 深拷贝 Map */
const cloneMap = (target: Map<any, any>, cloneTarget: Map<any, any>, map: WeakMap<any, any>): void => {
  target.forEach((value: any, key: any) => {
    cloneTarget.set(key, clone(value, map));
  });
}

/** 深拷贝对象或者数组 */
const cloneObjectOrArray = <T>(target: T, cloneTarget: T, map: WeakMap<any, any>): void => {
  for (let key in target) {
    const value = target[key];
    cloneTarget[key] = clone<typeof value>(value, map);
  }
}

const CloneFuncMap = {
  [TargetType.Map]: cloneMap,
  [TargetType.Set]: cloneSet,
  [TargetType.Array]: cloneObjectOrArray,
  [TargetType.Object]: cloneObjectOrArray,
  [TargetType.Args]: cloneObjectOrArray,
}

/** 深拷贝可迭代对象 */
const cloneIterableObject = <T>(target: T, cloneTarget: T, type: TargetType, map: WeakMap<any, any>): void => {
  const cloneFunc = CloneFuncMap[type];
  cloneFunc(target, cloneTarget, map);
}

/** 深拷贝 */
export function clone<T> (target: T, map: WeakMap<any, any> = new WeakMap()): T {
  // 1. 如果是基本数据类型直接返回
  if (!isObject(target)) {
    return target;
  }

  // 获得对象类型，区别可迭代对象和不可迭代对象
  const type = getTargetType(target);

  // 2. 如果不是可迭代对象，返回对应新构造的对象，例如 Date、RegExp、Number、String
  if (!isIterableType(type)) {
    return clonePlianObject(target, type);
  }

  // 3. 初始化拷贝对象，继承原型方法
  let cloneTarget = initTarget(target);

  // 4. 避免循环引用
  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  // 5. 拷贝可迭代对象，例如 Object、Array、Set、Map
  cloneIterableObject(target, cloneTarget, type, map);

  return cloneTarget;
}
